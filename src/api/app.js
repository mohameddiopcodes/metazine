const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config()
require('./config/database')

const publishingsRouter = require('./routes/publishings');
const metazinesRouter = require('./routes/metazines');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../build')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/publishings', publishingsRouter);
app.use('/api/metazines', metazinesRouter);
app.use('/api/users', usersRouter);

app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
})

module.exports = app;
