(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["onion"] = factory();
	else
		root["onion"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defineProperty = Object.defineProperty;


var cachedInjector = null;

function getInjector() {
    var rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('[ng-app]') || document.documentElement;

    var injector = angular.element(rootElement).injector();

    if (injector) {
        cachedInjector = injector;
        return injector;
    } else {
        var childNodes = rootElement.childNodes;

        var _arr = [].concat(_toConsumableArray(childNodes));

        for (var _i = 0; _i < _arr.length; _i++) {
            var node = _arr[_i];
            injector = getInjector(node);

            if (injector) {
                cachedInjector = injector;
                return injector;
            }
        }
    }
    return null;
}

defineProperty(exports, 'getInjector', {
    get: function get() {
        return cachedInjector || getInjector();
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var INJECTOR = __webpack_require__(0);

var defineProperty = Object.defineProperty;

var watchUtil = {};
var watchUtilMethod = ['$watch', '$watchCollection', '$watchGroup'];

var eventHandleElement = '$rootScope';

var _loop = function _loop(method) {
    defineProperty(watchUtil, method, {
        get: function get() {
            var injector = INJECTOR.getInjector;
            var rootScope = injector.get(eventHandleElement);
            return function () {
                rootScope[method].apply(rootScope, arguments);
            };
        }
    });
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = watchUtilMethod[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var method = _step.value;

        _loop(method);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

module.exports = watchUtil;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// @builtIns
var Apply = exports.Apply = __webpack_require__(3);
var Eventbus = exports.Eventbus = __webpack_require__(4);
var Watch = exports.Watch = __webpack_require__(1);

// @decorators
var Inject = exports.Inject = __webpack_require__(5);
var Mixin = exports.Mixin = __webpack_require__(6);
var Observable = exports.Observable = __webpack_require__(7);
var Service = exports.Service = __webpack_require__(8);
var Component = exports.Component = __webpack_require__(9);
var controller = exports.controller = __webpack_require__(10);

// @polyfill
var ResetModule = exports.ResetModule = __webpack_require__(11);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var INJECTOR = __webpack_require__(0);

var defineProperty = Object.defineProperty;


var eventHandleElement = '$rootScope';

var apply = function apply() {
    var injector = INJECTOR.getInjector;
    var rootScope = injector.get(eventHandleElement);
    if (!rootScope.$$phase) {
        rootScope.$digest();
    }
};

defineProperty(exports, '$apply', {
    get: function get() {
        return apply;
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var INJECTOR = __webpack_require__(0);

var defineProperty = Object.defineProperty;


var eventHandleElement = '$rootScope';

var eventBus = {};

var eventsPreset = ['$emit', '$on', '$broadcast'];

var _loop = function _loop(event) {
    defineProperty(eventBus, event, {
        get: function get() {
            var injector = INJECTOR.getInjector;
            var rootScope = injector.get(eventHandleElement);
            return function () {
                rootScope[event].apply(rootScope, arguments);
            };
        }
    });
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = eventsPreset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var event = _step.value;

        _loop(event);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

module.exports = eventBus;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var toString = Object.prototype.toString;
var propBlacklist = ['name', 'prototype', 'length'];

var builtInService = ['$anchorScroll', '$animate', '$animateCss', '$cacheFactory', '$compile', '$controller', '$document', '$exceptionHandler', '$filter', '$http', '$httpBackend', '$httpParamSerializer', '$httpParamSerializerJQLike', '$interpolate', '$interval', '$locale', '$location', '$log', '$parse', '$q', '$rootElement', '$rootScope', '$sce', '$sceDelegate', '$templateCache', '$templateRequest', '$timeout', '$window', '$xhrFactory', '$scope'];

var Inject = function Inject() {
    for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
        dependencies[_key] = arguments[_key];
    }

    return function (originTarget, name, descriptor) {
        if (descriptor) {
            throw new SyntaxError('non-constructor can not use @Inject');
        }
        var OriginalConstructor = originTarget;

        dependencies = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(dependencies), builtInService))));

        var Constructor = function Constructor() {
            var _this = this;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            _classCallCheck(this, Constructor);

            dependencies.forEach(function (dependency, i) {
                return _this[dependency] = args[i];
            });
            Object.assign(OriginalConstructor.prototype, this);

            var instance = new (Function.prototype.bind.apply(OriginalConstructor, [null].concat(args)))();

            Object.keys(this).forEach(function (prop) {
                if (OriginalConstructor.prototype.propertyIsEnumerable(prop)) {
                    delete OriginalConstructor.prototype[prop];
                }

                if (!instance.hasOwnProperty(prop)) {
                    instance[prop] = _this[prop];
                }
            });

            return instance;
        };

        var originInitHook = OriginalConstructor.prototype['$onInit'];

        OriginalConstructor.prototype['$onInit'] = function () {
            originInitHook.apply(this);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = originTarget.prototype.$$Observable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var observe = _step.value;
                    var method = observe.method,
                        expression = observe.expression,
                        handler = observe.handler,
                        deep = observe.deep;

                    if (typeof expression == 'string') {
                        this.$scope[method](expression, handler.bind(this), true);
                    } else {
                        this.$scope[method](expression.bind(this), handler.bind(this), true);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };

        // static 语法是不可枚举的，所以不使用Object.keys
        Object.getOwnPropertyNames(originTarget).forEach(function (prop) {
            if (propBlacklist.indexOf(prop) === -1) {
                Constructor[prop] = originTarget[prop];
            }
        });

        Constructor.$inject = dependencies;

        return Constructor;
    };
};

module.exports = Inject;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = Object.defineProperty,
    getOwnPropertyNames = Object.getOwnPropertyNames,
    getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors,
    assign = Object.assign;


var Mixin = function Mixin() {
    for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
    }

    return function (target, name, descriptor) {

        if (!mixins.length) {
            throw new SyntaxError('@mixin() class ' + target.name + ' at least one parameter is required;');
        }

        if (descriptor) {
            throw new SyntaxError('non-constructor can not use @Mixin');
        }

        var combination = assign.apply(undefined, [{}].concat(mixins));

        var descs = getOwnPropertyDescriptors(combination);
        var keys = getOwnPropertyNames(descs);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (!(key in target.prototype)) {
                    defineProperty(target.prototype, key, descs[key]);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
};

module.exports = Mixin;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Watch = __webpack_require__(1);

var Observable = function Observable() {
    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
    }

    return function (target, name, descriptor) {
        var watchMethod = '$watch';
        var watchUtilMethod = ['$watch', '$watchCollection', '$watchGroup'];

        var expression = options[0],
            deep = options[1],
            method = options[2];


        if (typeof deep !== 'boolean') {
            deep = Boolean(deep);
        }

        if (method !== undefined) {
            watchMethod = method.includes('$') ? method : '$' + options[3];
        }

        if (!watchUtilMethod.includes(watchMethod)) {
            throw new SyntaxError('@Observable() method ' + name + ' only support ' + watchUtilMethod.join('、') + ' method;');
        }

        target.$$Observable || (target.$$Observable = []);

        var observe = {
            method: watchMethod,
            expression: expression,
            handler: target[name],
            deep: deep
        };

        target.$$Observable.push(observe);
    };
};

module.exports = Observable;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Service = function Service(options) {
    return function (target, name, descriptor) {
        if (descriptor) {
            throw new SyntaxError('non-constructor can not use @Service');
        }

        var ServiceName = void 0;

        if (typeof options === 'string') {
            ServiceName = options;
        } else {
            ServiceName = options.name;
        }

        target.prototype.$$extend = {
            type: 'service',
            ServiceName: ServiceName,
            controller: target
        };
    };
};

module.exports = Service;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Component = function Component(options) {
    return function (target, name, descriptor) {
        if (descriptor) {
            throw new SyntaxError('non-constructor can not use @Component');
        }

        var selector = options.selector,
            template = options.template,
            props = options.props;

        target.prototype.$$extend = {
            type: 'component',
            selector: selector,
            template: template,
            controller: target,
            bindings: props
        };
    };
};

module.exports = Component;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Controller = function Controller(options) {
    return function (target, name, descriptor) {
        if (descriptor) {
            throw new SyntaxError('non-constructor can not use @Service');
        }

        var ControllerName = void 0;

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
};

module.exports = Controller;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function resetModule() {
    var angularModule = angular.module;
    angular.module = function (name, requires, configFn) {
        var result = angularModule.call(angular, name, requires, configFn);
        result.extend = function (controller) {
            var extendInfo = controller.prototype.$$extend;
            if (extendInfo.type === 'component') {
                var selector = extendInfo.selector.replace(/-([a-z])/g, function (str, match) {
                    return match.toLocaleUpperCase();
                });
                var template = extendInfo.template,
                    _controller = extendInfo.controller,
                    bindings = extendInfo.bindings;

                return this.component(selector, {
                    template: template,
                    controller: _controller,
                    bindings: bindings
                });
            } else if (extendInfo.type === 'service') {
                var _name = extendInfo.name.replace(/-([a-z])/g, function (str, match) {
                    return match.toLocaleUpperCase();
                });
                var _controller2 = extendInfo.controller;

                return this.service(_name, _controller2);
            } else if (extendInfo.type === 'controller') {
                var _controller3 = extendInfo.controller,
                    _name2 = extendInfo.name;

                return this.controller(_name2, _controller3);
            }
        };
        return result;
    };
}

resetModule();

module.exports = resetModule;

/***/ })
/******/ ]);
});