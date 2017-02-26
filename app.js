require('rootpath')();
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var db = require('db');

var port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', expressJwt({ secret: process.env.SECRET }).unless({ 
  path: [
    { url: '/api/auth', methods: ['POST'] },
    { url: '/api/users', methods: ['POST'] }
  ] 
}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'Invalid or expired token.'});
  }
});

app.use(express.static('./public'));
app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ideas', require('./routes/api/ideas'));
app.use('/api/users', require('./routes/api/users'));

app.all('*', function(req, res) {
  res.redirect('/');
});

var server = app.listen(port, function () {
  console.log("App is listening on port " + port);
});                      

// TODO
// html5 routing
// check email pattern on registration


// env $(cat .env) nodemon app.js
