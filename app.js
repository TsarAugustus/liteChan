'use strict';

// npm vars
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

// db stuff

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/litechan', {useNewUrlParser: true});
// mongoose.set('useCreateIndex', true);

//view engine
app.set('views', path.join(__dirname, 'views'));;
app.set('views engine', '.pug');

//bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
  secret: 'liteChan',
  resave: false,
  saveUninitiated: true
}));

app.use(express.static(path.join(__dirname, 'public')));

//routing
const routes = require('./routes/index');
const api = require('./routes/api');
app.use('/', routes);
app.use('/api', api);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
