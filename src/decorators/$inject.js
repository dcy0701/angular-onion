const toString = Object.prototype.toString;
const propBlacklist = ['name', 'prototype', 'length'];

const builtInService = [
    '$anchorScroll',
    '$animate',
    '$animateCss',
    '$cacheFactory',
    '$compile',
    '$controller',
    '$document',
    '$exceptionHandler',
    '$filter',
    '$http',
    '$httpBackend',
    '$httpParamSerializer',
    '$httpParamSerializerJQLike',
    '$interpolate',
    '$interval',
    '$locale',
    '$location',
    '$log',
    '$parse',
    '$q',
    '$rootElement',
    '$rootScope',
    '$sce',
    '$sceDelegate',
    '$templateCache',
    '$templateRequest',
    '$timeout',
    '$window',
    '$xhrFactory',
    '$scope'
];

const Inject = (...dependencies) => (originTarget, name, descriptor) => {
    if (descriptor) {
        throw new SyntaxError('non-constructor can not use @Inject');
    }
    const OriginalConstructor = originTarget;

    dependencies = [...new Set([...dependencies, ...builtInService])];

    class Constructor {
        constructor(...args) {
            dependencies.forEach((dependency, i) => this[dependency] = args[i]);
            Object.assign(OriginalConstructor.prototype, this);

            const instance = new OriginalConstructor(...args);

            Object.keys(this).forEach(prop => {
                if (OriginalConstructor.prototype.propertyIsEnumerable(prop)) {
                    delete OriginalConstructor.prototype[prop];
                }

                if (!instance.hasOwnProperty(prop)) {
                    instance[prop] = this[prop];
                }
            });

            return instance;
        }
    }

    let originInitHook = OriginalConstructor.prototype['$onInit'] || function () {};

    OriginalConstructor.prototype['$onInit'] = function () {
        originInitHook && originInitHook.apply(this);

        let observableList = originTarget.prototype.$$Observable || [];
        for (let observe of observableList) {
            let {method, expression, handler, deep} = observe;
            if (typeof expression == 'string') {
                this.$scope[method](expression, handler.bind(this), true);
            } else {
                this.$scope[method](expression.bind(this), handler.bind(this), true);
            }
        }

        let outputList = originTarget.prototype.$$Output || [];
        for (let output of outputList) {
            let {event, handler} = output;
            this.$rootScope.$on(event, (_, data) => {
                handler.call(this, data);
            });
        }
    };

    // static 语法是不可枚举的，所以不使用Object.keys
    Object.getOwnPropertyNames(originTarget).forEach(prop => {
		if (propBlacklist.indexOf(prop) === -1) {
			Constructor[prop] = originTarget[prop];
		}
	});

	Constructor.$inject = dependencies;

    return Constructor;
};

module.exports = Inject;
