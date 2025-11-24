const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM nirmaan_test01.users_s");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    const { name, age } = req.body;

    const result = await pool.query(
      "INSERT INTO nirmaan_test01.users_s (name, age) VALUES ($1, $2) RETURNING *",
      [name, age]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
