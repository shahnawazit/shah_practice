// writeToDB.js
const { Pool } = require('pg');

// ⚠️ Update these credentials for your PostgreSQL connection
const pool = new Pool({
  user: 'nirmaan_test',
  host: '10.75.151.100',
  database: 'nirmaan_trg',
  password: 'N1Rrm##n#2025',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }
});

async function insertIrisRow(dataObj) {
  const query = `
    INSERT INTO nirmaan_test01.iris (
      sepal_length, sepal_width, petal_length, petal_width, variety
    ) VALUES ($1, $2, $3, $4, $5)
  `;

  const values = [
    dataObj["sepal.length"],
    dataObj["sepal.width"],
    dataObj["petal.length"],
    dataObj["petal.width"],
    dataObj["variety"]
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("DB Insert Error:", err);
    throw err;
  }
}

module.exports = insertIrisRow;