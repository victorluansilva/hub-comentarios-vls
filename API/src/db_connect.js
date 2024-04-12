const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) return console.log(err);
    console.log('Conectado com sucesso!');
})

module.exports = db;