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
    const { sem_id, course_name, units } = req.body;

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
      const insertSQL = 'INSERT INTO courses (sem_id, course_name, units) VALUES (?, ?, ?)';
      const insertValues = [sem_id, course_name, units];

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

  const deleteCourse = (req, res) => {
    try {
      const { courseId } = req.params;
  
      // Check if the course exists
      const checkCourseSQL = 'SELECT * FROM courses WHERE course_id = ?';
      const checkValues = [courseId];
  
      db.query(checkCourseSQL, checkValues, (checkErr, checkResults) => {
        if (checkErr) {
          console.error('Error checking course existence:', checkErr);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
  
        if (checkResults.length === 0) {
          // Course not found
          return res.status(404).json({
            success: false,
            message: 'Course not found.',
          });
        }
  
        // If the course exists, proceed with deletion
        const deleteSQL = 'DELETE FROM courses WHERE course_id = ?';
        const deleteValues = [courseId];
  
        db.query(deleteSQL, deleteValues, (deleteErr, result) => {
          if (deleteErr) {
            console.error('Error deleting course:', deleteErr);
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error',
            });
          }
  
          res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            data: result,
          });
        });
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  const getCourseUnits = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      const sql = 'SELECT units FROM courses WHERE course_id = ?';
      const values = [courseId];
  
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error getting course units:', err);
          res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Course units retrieved successfully',
            units: results[0].units,
          });
        }
      });
    } catch (error) {
      console.error('Error getting course units:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

module.exports = { getCourseBySemester, addCourseBySemester, deleteCourse, getCourseUnits };
