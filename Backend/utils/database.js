const mysql = require('mysql');
require('dotenv').config({ path: 'config/.env' });


exports.connect = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    charset: 'utf8_general_ci'
  });
  return connection;
}

exports.pool = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    charset: 'utf8_general_ci',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  return pool;
}