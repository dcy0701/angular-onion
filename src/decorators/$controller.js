const Controller = (options) => (target, name, descriptor) => {
    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Controller');
    }

    let ControllerName;

    if (typeof options === 'string') {
        ControllerName = options;
    } else {
        ControllerName = options.name;
    }

    target.prototype.$$extend = {
        type: 'controller',
        name: ControllerName,
        controller: target
    };
};

module.exports = Controller;
