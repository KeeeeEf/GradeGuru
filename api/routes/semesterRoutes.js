// routes/semesterRoutes.js

const express = require('express');
const router = express.Router();
const { addSemester, getSemester } = require('../controller/semesterController');

router.post('/addsemester', addSemester);
router.get('/getsemester', getSemester);

module.exports = router;
