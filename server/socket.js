// Connecto to server and get packets

var net = require("net");
var events = require('events');
var util = require('util');

var Connection = function(settings) {
  events.EventEmitter.call(this);
  var self = this;
  var info = {}
  var bufor = ""; 

  this.socket = net.createConnection(settings.port, settings.host);
  this.socket.setNoDelay(true);

  this.socket.on('connect', function() {
    console.log('connected');
  });

  this.socket.on("data", function(chunk) {
      bufor += chunk;
      var index = bufor.indexOf("\n");
      var properData = index !== -1;
      if (properData) {
        var line = bufor.slice(0, index);
        var words = bufor.split(' ');
        if (words.shift() === 'OK') {
          var ints = words.map(function(x) {
            return parseInt(x);
          });
          var head = ints.shift();
          info.id = head & 0x1F;
          //info.head = head;
          info.buffer = new Buffer(ints);
        }
        // emit all packets
        self.emit('packet', info);
        // emit via node id
        self.emit('node-' + info.id, info)
        bufor = bufor.slice(index + 1);
      }
    });
}

util.inherits(Connection, events.EventEmitter);

module.exports = Connection;