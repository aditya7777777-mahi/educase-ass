const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL_MODE === 'REQUIRED' ? {rejectUnauthorized: false} : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// SQL query to create schools table if it doesn't exist
const createSchoolsTable = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Schools table created or already exists');
  } catch (error) {
    console.error('Error creating schools table:', error);
  }
};

// Initialize database
const initDb = async () => {
  try {
    await createSchoolsTable();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

module.exports = {
  pool,
  initDb
};