const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

const testConnection = async () => {
    try {
        await db.query('SELECT 1')
        console.log('MySQL connect successfylly!')
    }catch (error) {
        console.log('MySQL connection faild: ', error);
        process.exit(1);
    }
};

module.exports = { db, testConnection };