const { Pool } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const format = require('pg-format'); // npm install pg-format
const { parseComplete } = require('pg-protocol/dist/messages');
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

const rows = [];

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', row => {
        const age = parseInt(row.Age, 10);
        const name = row.Name.trim();
        //  if (age >= 10 && age <= 40) {
        if (age >= 10 && age <= 40 && row.Name && name.length === 4)
            rows.push([row.Name, age, row.City]);
    }
    )
    .on('end', async () => {
        if (rows.length === 0) {
            console.log('No valid rows to insert');
            return;
        }

        try {
            const query = format('INSERT INTO nirmaan_test01.users_s (name, age, city) VALUES %L', rows);
            await pool.query(query);
            console.log('Data inserted successfully!');
        } catch (err) {
            console.error('Error inserting data:', err);
        } finally {
            await pool.end();
        }
    });