const mysql = require('mysql2')


const db = mysql.createConnection({
   
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "edwin",
    database: process.env.DB_NAME || "recursif",
    insecureAuth: true,
  });
module.exports = db;
