var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    exphbs  = require('express-handlebars');

global.rootRequire = function(name){
  return require(__dirname + '/' + name)
};

var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main', partialsDir:'views/partials'}));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/bower_components',express.static(__dirname + '/bower_components'));

app.use(session({
      secret: 'This is One Terriableeee SecR3te',
      resave: false,
      saveUninitialized: true
//  cookie: { secure: true }
    })
);


module.exports = app;
