const Service = (options) => (target, name, descriptor) => {
    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Service');
    }

    let ServiceName;

    if (typeof options === 'string') {
        ServiceName = options;
    } else {
        ServiceName = options.name;
    }

    target.prototype.$$extend = {
        type: 'service',
        ServiceName,
        controller: target
    };
};

module.exports = Service;
