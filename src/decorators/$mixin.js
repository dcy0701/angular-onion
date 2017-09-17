const { defineProperty, getOwnPropertyNames, getOwnPropertyDescriptors, assign } = Object;

const Mixin = (...mixins) => (target, name, descriptor) => {

	if (!mixins.length) {
		throw new SyntaxError(`@mixin() class ${target.name} at least one parameter is required;`);
	}

    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Mixin');
    }

    let combination = assign({}, ...mixins);

    const descs = getOwnPropertyDescriptors(combination);
    const keys = getOwnPropertyNames(descs);

    for (let key of keys) {
        if (!(key in target.prototype)) {
            defineProperty(target.prototype, key, descs[key]);
        }
    }
};

module.exports = Mixin;
