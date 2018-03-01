const debounce = require('lodash.debounce');

module.exports = function(wait, options = {}) {
	return function(target, name, descriptor) {
		return {
			configurable: true,
			enumerable: descriptor.enumerable,
			get: function() {
				Object.defineProperty(this, name, {
					configurable: true,
					enumerable: descriptor.enumerable,
					value: debounce(descriptor.value, wait, options)
				});

				return this[name];
			}
		};
	};
}
