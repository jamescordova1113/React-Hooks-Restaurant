const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const route = require('./routes/indexRoute');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURL, {
  useNewUrlParser: true
})
.then(() => console.log("Connected to MongoDB..."))
.catch(() => console.log("Unable to connect MongoDB..."));

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.listen(8000, (error) => {
  if (error) {
    return console.log(error.message);
  }
  console.log("Listening on port 8000");
});

module.exports = app;
