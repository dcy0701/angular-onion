const Component = (options) => (target, name, descriptor) => {
    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Component');
    }

    let { selector, template, props, bindings } = options;

    props = props ? props: bindings;

    target.prototype.$$extend = {
        type: 'component',
        selector,
        template,
        controller: target,
        bindings: props
    };
};

module.exports = Component;
