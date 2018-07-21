const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const allowCors = require('./config/cors');
const config = require('./config/config');


mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION)
mongoose.connect(config.MONGO_URL);
let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to the database.');
});

db.on('error', (err) => {
    console.log(`Database error: ${err}`,config.MONGO_URL);
});

// Instantiate express
const app = express();

//sessions


// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cors
app.use(allowCors);

// Initialize routes middleware

app.use('/', require('./routes/user'));
app.use('/data', require('./routes/data'))
// Use express's default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ err: err });
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', function (req, res) {
    res.send('Hello API');
});
