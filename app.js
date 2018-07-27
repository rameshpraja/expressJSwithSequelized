var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');



var app = express();

// view engine setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Models
var models = require("./models");
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});

// Require our routes into the application.
require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));


module.exports = app;
