const Component = (options) => (target, name, descriptor) => {
    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Component');
    }

    let { selector, template, props } = options;
    target.prototype.$$extend = {
        type: 'component',
        selector,
        template,
        controller: target,
        bindings: props
    };

    angular.module = angular.module
};

module.exports = Component;
