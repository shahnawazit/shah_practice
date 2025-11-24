const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const pool = require("../db");

const uploadsDir = path.join(__dirname, "..", "uploads");
// ensure uploads dir exists
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ts = Date.now();
    cb(null, `${ts}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// POST /api/users/upload  (multipart/form-data file field name: "file")
router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  const rows = [];

  // parse CSV
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      // push row as-is, will validate later
      rows.push(row);
    })
    .on("end", async () => {
      if (rows.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: "CSV was empty" });
      }

      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        // Prepare insert: table nirmaan_test01.users_s (name, age)
        const insertText = `INSERT INTO nirmaan_test01.users_s (name, age) VALUES ($1, $2) RETURNING *`;

        for (const r of rows) {
          // Expect CSV columns: Name,Age  (case-insensitive)
          // Normalize keys: try multiple variants
          const name = r.Name ?? r.name ?? r.NAME ?? "";
          let ageRaw = r.Age ?? r.age ?? r.AGE ?? "";

          // Basic validation
          const age = parseInt(String(ageRaw).trim(), 10);
          if (!name || Number.isNaN(age)) {
            // skip invalid row (or you could return error)
            console.warn("Skipping invalid CSV row:", r);
            continue;
          }

          await client.query(insertText, [String(name).trim(), age]);
        }

        await client.query("COMMIT");

        fs.unlinkSync(filePath);
        res.json({ message: "CSV processed and inserted." });
      } catch (err) {
        await client.query("ROLLBACK");
        console.error("CSV insert error:", err);
        // remove uploaded file
        try { fs.unlinkSync(filePath); } catch(e){}
        res.status(500).json({ error: err.message });
      } finally {
        client.release();
      }
    })
    .on("error", (err) => {
      console.error("CSV parse error:", err);
      try { fs.unlinkSync(filePath); } catch(e){}
      res.status(500).json({ error: "Failed to parse CSV" });
    });
});

module.exports = router;
