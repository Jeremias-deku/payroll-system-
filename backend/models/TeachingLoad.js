import db from "../config/db.js";

// Create Teaching Load table if not exists
export const createTeachingLoadTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS teaching_load (
      id INT PRIMARY KEY AUTO_INCREMENT,
      teacher_id INT NOT NULL,
      subject VARCHAR(255) NOT NULL,
      class_section VARCHAR(100) NOT NULL,
      day VARCHAR(20) NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      completion_status ENUM('pending', 'approved', 'disapproved') DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
    )
  `;
  db.query(sql, (err) => {
    if (err) console.error("Error creating teaching_load table:", err);
    else console.log("Teaching Load table ready");
  });
};

// Create teaching load record
export const createTeachingLoad = (loadData, callback) => {
  const sql = `
    INSERT INTO teaching_load (teacher_id, subject, class_section, day, start_time, end_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    loadData.teacher_id,
    loadData.subject,
    loadData.class_section,
    loadData.day,
    loadData.start_time,
    loadData.end_time,
    'Active'
  ];
  
  db.query(sql, values, callback);
};

// Get teaching load by teacher ID
export const getTeachingLoadByTeacherId = (teacher_id, callback) => {
  const sql = "SELECT * FROM teaching_load WHERE teacher_id = ? ORDER BY day, start_time";
  db.query(sql, [teacher_id], callback);
};

// Get all teaching loads
export const getAllTeachingLoads = (callback) => {
  const sql = `
    SELECT tl.*, t.name as teacher_name FROM teaching_load tl
    JOIN teachers t ON tl.teacher_id = t.id
    ORDER BY tl.day, tl.start_time
  `;
  db.query(sql, callback);
};

// Get teaching load by ID
export const getTeachingLoadById = (id, callback) => {
  const sql = "SELECT * FROM teaching_load WHERE id = ?";
  db.query(sql, [id], callback);
};

// Update teaching load
export const updateTeachingLoad = (id, loadData, callback) => {
  const sql = `
    UPDATE teaching_load 
    SET subject = ?, class_section = ?, day = ?, start_time = ?, end_time = ?, status = ?
    WHERE id = ?
  `;
  const values = [
    loadData.subject,
    loadData.class_section,
    loadData.day,
    loadData.start_time,
    loadData.end_time,
    loadData.status,
    id
  ];
  
  db.query(sql, values, callback);
};

// Delete teaching load
export const deleteTeachingLoad = (id, callback) => {
  const sql = "DELETE FROM teaching_load WHERE id = ?";
  db.query(sql, [id], callback);
};

// Mark teaching load as done (pending admin approval)
export const markTeachingLoadAsDone = (id, callback) => {
  const sql = `
    UPDATE teaching_load 
    SET completion_status = 'pending'
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};

// Approve teaching load (admin action)
export const approveTeachingLoad = (id, callback) => {
  const sql = `
    UPDATE teaching_load 
    SET completion_status = 'approved'
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};

// Disapprove teaching load (admin action - allow teacher to resubmit)
export const disapproveTeachingLoad = (id, callback) => {
  const sql = `
    UPDATE teaching_load 
    SET completion_status = 'disapproved'
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};
