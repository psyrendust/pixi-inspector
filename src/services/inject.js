var {Observable} = require('rx');
var detectPixi = require('./detectPixi')
var proxy = require('./proxy')

var injectInspector = detectPixi.flatMap(function (path) {
	return proxy.eval('window.PI_PIXI_PATH = "' + path + '"').then(function () {
		return proxy.injectScript('pixi.inspector.js');
	});
}).flatMap(function () {
	return Observable.return(1);
});

module.exports = injectInspector;