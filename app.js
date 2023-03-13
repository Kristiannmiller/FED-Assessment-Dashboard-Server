const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./api/routes/users');
const userInfoRoutes = require('./api/routes/userInfo');
const categoryRoutes = require('./api/routes/categories');

mongoose.connect(
  'mongodb+srv://kristiannmiller:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0.h8tle5j.mongodb.net/?retryWrites=true&w=majority'
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', '*');
  if (request.method === 'OPTIONS') {
    response.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET'
    );
    return response.status(200).json({});
  }
  next();
});

app.use('/user', userInfoRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', usersRoutes);

app.use((request, response, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

