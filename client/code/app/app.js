// Client Code

ss.event.on('node-12', function(message) {
	//console.log(JSON.parse(message));
	var j = JSON.parse(message);
	var data = "<td class='greenbox-head'><h1>node12</h1><h3>test</h3></td><td class='greenbox'><h1>Licznik</h1><h3>" + j.lp + "</h3></td><td class='greenbox'><h1>Napięcie(V)</h1><h3>" + j.batvol/1000 + "</h3></td>"
	return $('.node12').html(data)
});

ss.event.on('node-2', function(message) {
	var j = JSON.parse(message);
	var data = "<td class='brownbox-head'><h1>node2</h1><h3>pokój A</h3></td><td class='brownbox'><h1>Temperatura(&deg;C)</h1><h3>" + j.temp/10 + "</h3></td><td class='brownbox'><h1>Ciśnienie(hPa)</h1><h3>" + j.press/10 + "</h3></td><td class='brownbox'><h1>Wilgotność(%)</h1><h3>" + j.humi/10 + "</h3></td><td class='brownbox'><h1>Napięcie(V)</h1><h3>" + j.batvol/1000 + "</h3></td>"
	return $('.node2').html(data)
});

/*
# Private functions
timestamp () ->
  d = new Date()
  return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds())

pad2 (number) ->
  return (number < 10 ? '0' : '') + number

valid (text) ->
  return text && text.length > 0
*/
console.log('App Loaded');