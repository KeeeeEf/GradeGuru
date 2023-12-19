
const db = require('./a_db');

const addCriteria = async (req, res) => {
    const { course_id, types } = req.body;
  
    try {
      const insertPromises = types.map(async (type) => {
        const { type: criteriaType, percentage } = type;
        await db.query(
          'INSERT INTO criteria (course_id, type, percentage) VALUES (?, ?, ?)',
          [course_id, criteriaType, percentage]
        );
      });
  
      await Promise.all(insertPromises);
  
      res.json({ success: true, message: 'Criteria added successfully.' });
    } catch (error) {
      console.error('Error adding criteria:', error);
      res.status(500).json({ success: false, message: 'Error adding criteria.' });
    }
  };

const getCriteria = (req,res) =>{
    try{
        const {course_id} = req.query

        const sql = 'SELECT * FROM criteria WHERE course_id = ?';
        const values = [course_id];

        db.query(sql, values, (err, results)=>{
            if(err){
                console.error('Error getting criteria');
                res.status(500).json({
                    success:false,
                    message: 'Internal Server Error',
                });
            }else{
                res.status(200).json({
                    success: true,
                    message: 'Semesters retrieved successfully',
                    data: results,
                });
            }
        });
    } catch(error){
        console.error('Error getting criteria:',error);
        res.status(500).json({
            success:false,
            mesasage: 'Internal Server Error',
        });
    }
};

module.exports = { addCriteria, getCriteria };