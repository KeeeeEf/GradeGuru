// controllers/courseController.js
const db = require('./a_db');

const getCourseBySemester = (req, res) => {
  try {
    const { semesterId } = req.query;

    const sql = 'SELECT * FROM courses WHERE sem_id = ?';
    const values = [semesterId];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error getting courses:', err);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Courses retrieved successfully',
          data: results,
        });
      }
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const addCourseBySemester = (req, res) => {
    try {
      const { sem_id, course_name } = req.body;
  
      // Check for duplicate course names in the same semester
      const checkDuplicateSQL = 'SELECT * FROM courses WHERE sem_id = ? AND course_name = ?';
      const duplicateValues = [sem_id, course_name];
  
      db.query(checkDuplicateSQL, duplicateValues, (duplicateErr, duplicateResults) => {
        if (duplicateErr) {
          console.error('Error checking for duplicate course:', duplicateErr);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
  
        if (duplicateResults.length > 0) {
          // Duplicate course found
          return res.status(400).json({
            success: false,
            message: 'Course with the same name already exists in the selected semester.',
          });
        }
  
        // If no duplicates, proceed with adding the course
        const insertSQL = 'INSERT INTO courses (sem_id, course_name) VALUES (?, ?)';
        const insertValues = [sem_id, course_name];
  
        db.query(insertSQL, insertValues, (insertErr, result) => {
          if (insertErr) {
            console.error('Error adding course:', insertErr);
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error',
            });
          }
  
          res.status(201).json({
            success: true,
            message: 'Course added successfully',
            data: result,
          });
        });
      });
    } catch (error) {
      console.error('Error adding course:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

module.exports = { getCourseBySemester, addCourseBySemester };
