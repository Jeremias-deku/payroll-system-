import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'payroll_system'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to database');

  // Check if column exists, if not add it
  const checkColumnSql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                          WHERE TABLE_NAME='teaching_load' AND COLUMN_NAME='completion_status'`;

  db.query(checkColumnSql, (err, results) => {
    if (err) {
      console.error('Error checking column:', err);
      db.end();
      process.exit(1);
    }

    if (results.length === 0) {
      // Column doesn't exist, add it
      const alterTableSql = `ALTER TABLE teaching_load 
                            ADD COLUMN completion_status ENUM('pending', 'approved', 'disapproved') DEFAULT NULL`;

      db.query(alterTableSql, (err) => {
        if (err) {
          console.error('Error adding column:', err);
          db.end();
          process.exit(1);
        }
        console.log('✓ Successfully added completion_status column to teaching_load table');
        db.end();
      });
    } else {
      console.log('✓ completion_status column already exists');
      db.end();
    }
  });
});
