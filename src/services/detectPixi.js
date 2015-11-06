var proxy = require('./proxy');	
var {Observable} = require('rx');

var detectTimeout = 250;
module.exports =  Observable.defer(detectPixi)
	.retryWhen(function (errors) {
		return errors.delay(function (error) {
			if (detectTimeout < 5000) {
				detectTimeout += 250; // increase retry interval
			}
			return Observable.timer(detectTimeout);
		})
	}).do(function (value) {
		detectTimeout = 250; // reset retry interval
	});

/**
 * detectPixi
 * @returns Promise
 */
function detectPixi() {
	return proxy.evalFn(function () {
		var detect = function detect(window) {
			if (window.PIXI) { // global variable
				return 'PIXI';
			} else if (window.game && window.game.PIXI) { // inside panda.js
				return 'game.PIXI';
			} else if (window.Phaser && window.Phaser.PIXI) { // inside Phaser
				return 'Phaser.PIXI';
			}
		}
		var detected = detect(window);
		if (detected) {
			return 'window.' + detected;
		}
		for (var i = 0; i < window.frames.length; i++) {
			detected = detect(window.frames[i]);
			if (detected) {
				return 'window.frames[' + i +'].' + detected;
			}
		}
		return false;
	}).then(function (path) {
		if (path === false) {
			throw new Error('Unable to detect PIXI');
		}
		return path;
	});
}

