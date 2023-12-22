// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const { getCourseBySemester, addCourseBySemester, deleteCourse, getCourseUnits } = require('../controller/courseController');

router.get('/getCourseBySemester', getCourseBySemester);
router.post('/addCourseBySemester', addCourseBySemester);
router.delete('/deleteCourse/:courseId', deleteCourse);
router.get('/getCourseUnits/:courseId', getCourseUnits);

module.exports = router;
