// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const { getCourseBySemester, addCourseBySemester } = require('../controller/courseController');

router.get('/getCourseBySemester', getCourseBySemester);
router.post('/addCourseBySemester', addCourseBySemester);

module.exports = router;
