const Controller = (options) => (target, name, descriptor) => {
    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Service');
    }

    target.prototype.$$extend = {
        type: 'controller',
        name: options.name,
        controller: target
    };
};

module.exports = Controller;
