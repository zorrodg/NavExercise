'use strict';

var express = require('express'),
	http = require('http');

var app = module.exports = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);


// app.use(express.logger('dev'));
// app.use(express.errorHandler());
app.use(express.static(__dirname + '/app'));

require('./lib/routes')(app);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
