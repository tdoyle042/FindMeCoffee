
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var sass = require('node-sass');
var secrets = require('./secrets')

var foursquare = (require('foursquarevenues'))(secrets.clientid,secrets.clientkey);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
 sass.middleware({
     src: __dirname + '/sass/', //where the sass files are 
     dest: __dirname + '/public/css/', //where css should go
     debug: false // obvious
 })
);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req,res) {
	res.sendfile('views/home.html')
});

// app.get('/public/*', function (req,res) {
// 	res.sendfile(req.path)
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
