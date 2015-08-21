var express = require('express');
var path = require('path');
var redis = require('redis');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

var server = app.listen(8080, function(){
  console.log('listening on *:8080');
});

var client = redis.createClient(
                6379,
                'localhost',
                {});

client.subscribe('handheld');
client.on('message', function(channel, message) {
  var json_data = JSON.parse(message);
  io.emit('handheld_data', json_data);
});

var io = require('socket.io')(server);

io.on('connection', function(socket){

});

module.exports = app;
