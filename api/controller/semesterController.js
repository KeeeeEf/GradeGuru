// controller/semesterController.js

const db = require('./a_db');

const addSemester = (req, res) => {
    try {
      const { account_id, year, semester } = req.body;
  
      // Check for duplicate semester/year combinations in the database
      const checkDuplicateSQL = 'SELECT * FROM semester WHERE account_id = ? AND year = ? AND semester = ?';
      const duplicateValues = [account_id, year, semester];
  
      db.query(checkDuplicateSQL, duplicateValues, (duplicateErr, duplicateResults) => {
        if (duplicateErr) {
          console.error('Error checking for duplicate semester:', duplicateErr);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
  
        if (duplicateResults.length > 0) {
          // Duplicate semester found
          return res.status(400).json({
            success: false,
            message: 'Semester with the same name and year already exists.',
          });
        }
  
        // If no duplicates, proceed with adding the semester
        const insertSQL = 'INSERT INTO semester (account_id, year, semester) VALUES (?, ?, ?)';
        const insertValues = [account_id, year, semester];
  
        db.query(insertSQL, insertValues, (insertErr, result) => {
          if (insertErr) {
            console.error('Error adding semester:', insertErr);
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error',
            });
          }
  
          res.status(201).json({
            success: true,
            message: 'Semester added successfully',
            data: result,
          });
        });
      });
    } catch (error) {
      console.error('Error adding semester:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

const getSemester = (req, res) => {
    try {
      const { account_id } = req.query;
  
      const sql = 'SELECT * FROM semester WHERE account_id = ?';
      const values = [account_id];
  
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error getting semesters:', err);
          res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Semesters retrieved successfully',
            data: results,
          });
        }
      });
    } catch (error) {
      console.error('Error getting semesters:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
  
  module.exports = { addSemester, getSemester };
