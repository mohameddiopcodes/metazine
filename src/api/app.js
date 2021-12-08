const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config()
require('./config/database')

const publishingsRouter = require('./routes/publishings');
const profilesRouter = require('./routes/profiles');
const usersRouter = require('./routes/users');
const checkToken = require('./config/checkToken');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../build')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json({limit: '400mb'}));

app.use(checkToken)

app.use('/api/publishings', publishingsRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/users', usersRouter);

app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
})

module.exports = app;
