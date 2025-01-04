const mysql = require('mysql2/promise');

let pool;

async function initDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',        // from CF output
      port: process.env.DB_PORT || 3306,        // 3306
      user: process.env.DB_USER || 'root',        // admin
      password: process.env.DB_PASSWORD || '12345',// MyPlaceholderPass
      database: process.env.DB_NAME || 'employees_db',    // employees_db
      connectionLimit: 5,
    });
  }
  return pool;
}

module.exports = { initDB };
