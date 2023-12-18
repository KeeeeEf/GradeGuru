
const db = require('./a_db');

const addCriteria = (req,res) =>{
 console.log('hello')
}

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