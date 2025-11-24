const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// allow Vite dev server origin
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/users/upload", require("./routes/upload"));

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
