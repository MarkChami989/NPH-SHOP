const mysql = require('mysql2/promise');
const config = require('./database.json');

const pool = mysql.createPool({
  host: config.server,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection()
  .then(conn => {
    console.log('🎉 Connected to MySQL via [db.js]!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
  });

module.exports = pool;
