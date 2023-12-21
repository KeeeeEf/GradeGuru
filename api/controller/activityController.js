const db = require('./a_db'); 

const addActivity = (req, res) => {
  try {
    const { course_id, term, activity, type, score, total } = req.body;
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

        const sql = 'INSERT INTO activity (course_id, criteria_id, term, activity, total, score) VALUES (?, ?, ?, ?, ?, ?)';
        const insertValues = [course_id, results[0].criteria_id, term, activity, total, score];

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
      const { course_id, term } = req.query; 
  
      // Joining the activity table with the criteria table on the type_id and course_id
      const activity_type_sql = `
      SELECT a.*, c.type AS type, s.course_name AS course_name FROM activity a JOIN criteria c ON a.criteria_id = c.criteria_id JOIN courses s ON a.course_id = s.course_id WHERE a.course_id = ? AND a.term = ?;
    `;
    

      const values = [course_id, term];
  
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

    const updatePromises = [];

    activities.forEach((data) => {
      const { course_id, type, activity_id, activity, total, score } = data;

      const sql = 'SELECT criteria_id FROM criteria WHERE course_id=? AND type=?';
      const criteriaValue = [course_id, type];

      const updatePromise = new Promise((resolve, reject) => {
        db.query(sql, criteriaValue, (err, results) => {
          if (err) {
            console.error('Error obtaining criteria', err);
            reject(err);
          } else {
            if (results.length === 0) {
              reject('Criteria not found');
              return;
            }

            const updateSql = `UPDATE activity SET criteria_id=?, activity=?, total=?, score=? WHERE activity_id = ?`;
            const values = [results[0].criteria_id, activity, total, score, activity_id];

            db.query(updateSql, values, (err, results) => {
              if (err) {
                console.error('Error updating activity:', err);
                reject(err);
              } else {
                resolve(results);
              }
            });
          }
        });
      });

      updatePromises.push(updatePromise);
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
  } catch (error) {
    console.error('Error updating activities:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};




const deleteActivity = (req,res) =>{
  const {status, data:{course_id, activity_id}} = req.body


  console.log(req.body)
  console.log(status, course_id, activity_id)
  
  let sql='';
  const values = [course_id, activity_id]


  if(status === 'one'){
    sql = `DELETE FROM activity WHERE course_id=? AND activity_id=?`
  }else if(status === 'all'){
    sql = `DELETE FROM activity`
  }

  db.query(sql, values, (err, results)=>{
    if (err) {
      console.error('Error deleting');
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Deleted successfully',
      });
    }
  })
  
}

module.exports = {addActivity, getActivity, editActivity, deleteActivity}