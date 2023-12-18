require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');

//Routes
// const userRoutes = require('./routes/userRoutes')
const authenticationRoutes = require('./routes/authenticationRoutes')
const semesterRoutes = require('./routes/semesterRoutes');
const criteriaRoutes = require('./routes/criteriaRoutes');
const activityRoutes = require('./routes/activityRoutes');
const userRoutes = require('./routes/userRoutes')
// const forgetPasswordRoutes = require('./routes/forgetPasswordRoutes')

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST"],
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const allowedOrigins = [process.env.CORS_ORIGIN];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());
app.use('/',authenticationRoutes);
app.use('/semesters', semesterRoutes);
app.use('/criteria', criteriaRoutes);
app.use('/activity', activityRoutes);
app.use('/user', userRoutes);

module.exports = app;