var server = require("./socket.js");

config = {
  host: '192.168.88.15',
  port: 2000
};

exports.startClient = function(ss) {


var conn = new server({ port: config.port, host: config.host});

conn.on('node-2', function(mydata) {
	var i;
	var bytes = [];
    for (i = 0; i <= 11; i++) {
		bytes.push(mydata.buffer.readUInt8(i));
	}
          
	var result = {
		light: (256 * bytes[1]) + bytes[0],
		humi: (265 * bytes[3]) + bytes[2],
		temp: (265 * bytes[5]) + bytes[4],
		press: (265 * bytes[7]) + bytes[6],
		lobat: (265 * bytes[8]),
		batvol: (265 * bytes[10]) + bytes[9]
	};
	ss.api.publish.all('node-2', JSON.stringify(result));

});

conn.on('node-12', function(mydata) {
	var i;
	var bytes = [];
    for (i = 0; i <= 6; i++) {
		bytes.push(mydata.buffer.readUInt8(i));
	}

	var result = {
		lp: mydata.buffer.readUInt32LE(0),
		batvol: (265 * bytes[5]) + bytes[4]
	};
	ss.api.publish.all('node-12', JSON.stringify(result));
});
}



/*
module.exports = {
	'node-12': node12
}
*/