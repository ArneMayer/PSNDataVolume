// Parse the document
var whole = document.getElementsByTagName("pre")[0].innerHTML;
var lines = whole.split("\n");
var ipLines = lines.slice(2, lines.length - 7);
var ipDict = {};

// Get limit
var limit = parseInt(lines[0].match(/derzeit .+ MByte/)[0].replace('derzeit ', '').replace('MByte',''));

// Parse the IP list
for(i = 0; i < ipLines.length; i++) {
	var ipLine = ipLines[i];
	var reducedLine = ipLine.replace(/\s+/, " ");
	var ip = reducedLine.split(" ")[0];
	var mbytes = reducedLine.split(" ")[1];
	//console.log("IP: " + ip + ", data: " + mbytes + " MB");
	ipDict[ip] = mbytes;
}

function getPercentage (use, limit) {
	var percentage = use / limit * 100;
	return Math.round(percentage * 10) / 10.0;
};

function getRemaining (use, limit) {
	return limit - use;
};

// Get own ip
$.getJSON('//freegeoip.net/json/', function (data) {
	var ip = data['ip'];
	var volume = parseInt(ipDict[ip]);
	
	// Insert volume information
	var yourIpElement = document.createElement('p');
	yourIpElement.innerHTML = 'Deine IP: ' + ip + " - " + volume + 'MB (' + getPercentage(volume, limit) + '%, verbleibend: ' + getRemaining(volume, limit) + ' MB)';
	var bodyElement = document.getElementsByTagName("body")[0];
	bodyElement.insertBefore(yourIpElement, bodyElement.firstChild);
});