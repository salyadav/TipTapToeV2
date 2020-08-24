const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//DB setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established successfully');
});


const leaderboardRouter = require('./routes/leaderboard');
const feedbackRouter = require('./routes/feedback');

app.use('/leaderboard', leaderboardRouter);
app.use('/feedback', feedbackRouter);

//server start
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});