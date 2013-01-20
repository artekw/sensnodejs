// My SocketStream 0.3 app
//https://github.com/Anephenix/dashku/blob/master/server/db.coffee

var config = require('./config');
var http = require('http');
var ss = require('socketstream');

// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'app.html',
  css:  ['app.css'],
  code: ['libs/jquery.min.js', 'app']
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('main');
});

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));
//ss.client.formatters.add(require('ss-coffee'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// redis
ss.session.store.use('redis', config.redisConfig);
console.log(config.redisConfig);
//ss.publish.transport.use('redis', redis_config);

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(3000);

// Start SocketStream
ss.start(server);

//
s = require('./server/decoders.js')
s.startClient(ss);