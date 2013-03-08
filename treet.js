'use strict';

var assert = require('assert');
var toString = Object.prototype.toString;
var number = /^\d+$/;

function item(obj, path, indent, visited) {
	if(obj === undefined) return 'undefined\n';
	if(obj === null) return 'null\n';

	var formatted;
	var type = toString.call(obj);

	if(type === '[object Number]') {
		formatted = 1 / obj === -Infinity ? '-0' : obj.toString();
	} else if(type === '[object String]') {
		formatted = JSON.stringify(obj);
	} else if(type === '[object Boolean]' || type === '[object RegExp]' || type === '[object Date]') {
		formatted = obj.toString();
	} else {
		formatted = obj.constructor && obj.constructor.name;
	}

	formatted += '\n';

	visited.push({path: path, object: obj});

	for(var k in obj) {
		if(type === '[object String]' && number.test(k)) {
			// Ignore indices in strings; every character as a key looks silly
			continue;
		}

		var v = obj[k];

		for(var i = visited.length; i--;) {
			if(visited[i].object === v) {
				formatted += indent + '  ' + k + ': ' + (visited[i].path || '(root)') + '\n';
				break;
			}
		}

		if(i === -1)
			formatted += indent + '  ' + k + ': ' + item(v, path + '.' + k, indent + '  ', visited);
	}

	assert.strictEqual(visited.pop().object, obj);

	return formatted;
}

function treet(obj) {
	return item(obj, '', '', []);
}

module.exports = treet;
