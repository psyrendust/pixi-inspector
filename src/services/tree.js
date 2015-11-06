var {Observable} = require('rx');
var inject = require('./inject');

module.exports = inject.filter(function (state) {
	console.log(state);
});