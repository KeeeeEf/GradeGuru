// routes/semesterRoutes.js

const express = require('express');
const router = express.Router();
const { addActivity, getActivity, editActivity, deleteActivity } = require('../controller/activityController');

router.post('/addactivity', addActivity);
router.get('/getactivity', getActivity);
router.post('/editactivity', editActivity);
router.get('/deleteactivity', deleteActivity);

module.exports = router;
