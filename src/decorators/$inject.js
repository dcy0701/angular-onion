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

    originInitHook = OriginalConstructor.prototype['$onInit'];

    OriginalConstructor.prototype['$onInit'] = function () {
        originInitHook.apply(this);
        for (let observe of originTarget.prototype.$$Observable) {
            let {method, expression, handler, deep} = observe;
            if (typeof expression == 'string') {
                this.$scope[method](expression, handler.bind(this), true);
            } else {
                this.$scope[method](expression.bind(this), handler.bind(this), true);
            }
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
