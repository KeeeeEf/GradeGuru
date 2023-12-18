const db = require('./a_db'); 

const addActivity = (req, res) => {
  try {
    const { course_id, activity, type, score, total } = req.body;
    console.log(req.body);

    const criteriaSql = 'SELECT criteria_id FROM criteria WHERE course_id=? AND type=?';
    const criteriaValue = [course_id, type];

    db.query(criteriaSql, criteriaValue, (err, results) => {
      if (err) {
        console.error('Error getting activity and criteria');
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      } else {
        if (results.length === 0) {
          res.status(404).json({
            success: false,
            message: 'Criteria not found',
          });
          return;
        }

        const sql = 'INSERT INTO activity (course_id, criteria_id, activity, total, score) VALUES (?, ?, ?, ?, ?)';
        const insertValues = [course_id, results[0].criteria_id, activity, total, score];

        db.query(sql, insertValues, (err, results) => {
          if (err) {
            console.error('Error Adding Activity', err);
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error',
            });
          }

          // Retrieve the inserted activity data by querying with its activity_id
          const insertedActivityId = results.insertId;
          const getActivitySql = `
          SELECT a.*, c.type
          FROM activity a
          JOIN criteria c ON a.criteria_id = c.criteria_id
          WHERE a.activity_id = ?;
        `;

          db.query(getActivitySql, [insertedActivityId], (err, activityResults) => {
            if (err) {
              console.error('Error retrieving inserted activity', err);
              return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
              });
            }

            const insertedActivity = activityResults[0];

            res.status(201).json({
              success: true,
              message: 'Activity added successfully',
              data: insertedActivity,
            });
          });
        });
      }
    });
  } catch {
    // Handle any other errors here
  }
};


const getActivity = (req, res) => {
    try {
      const { course_id } = req.query;
  
      // Joining the activity table with the criteria table on the type_id and course_id
      const activity_type_sql = `
        SELECT a.*, c.type
        FROM activity a
        JOIN criteria c ON a.criteria_id = c.criteria_id
        WHERE a.course_id = ?;
      `;
      const values = [course_id];
  
      db.query(activity_type_sql, values, (err, results) => {
        if (err) {
          console.error('Error getting activity and criteria');
          res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Activities retrieved successfully',
            data: results,
          });
        }
      });
    } catch (error) {
      console.error('Error getting activity and criteria:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
};
  

const editActivity = (req, res) => {
  try {
    const activities = req.body;

    console.log(req.body);

    // Assuming all activities have the same course_id and type
    const { course_id, type } = activities[0];

    const sql = 'SELECT criteria_id FROM criteria WHERE course_id=? AND type=?';
    const criteriaValue = [course_id, type];

    db.query(sql, criteriaValue, (err, results) => {
      if (err) {
        console.error('Error obtaining criteria', err);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      } else {
        if (results.length === 0) {
          res.status(404).json({
            success: false,
            message: 'Criteria not found',
          });
          return;
        }

        const updatePromises = activities.map((activity) => {
          return new Promise((resolve, reject) => {
            const updateSql = `UPDATE activity SET criteria_id=?, activity=?, total=?, score=? WHERE activity_id = ?`;
            const values = [results[0].criteria_id, activity.activity, activity.total, activity.score, activity.activity_id];

            db.query(updateSql, values, (err, results) => {
              if (err) {
                console.error('Error updating activity:', err);
                reject(err);
              } else {
                resolve(results);
              }
            });
          });
        });

        Promise.all(updatePromises)
          .then(() => {
            res.status(200).json({
              success: true,
              message: 'Activities updated successfully',
            });
          })
          .catch((error) => {
            console.error('Error updating activities:', error);
            res.status(500).json({
              success: false,
              message: 'Internal Server Error',
            });
          });
      }
    });
  } catch (error) {
    console.error('Error updating activities:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};



const deleteActivity = (req,res) =>{

}

module.exports = {addActivity, getActivity, editActivity, deleteActivity}