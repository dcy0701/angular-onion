const INJECTOR  = require('./../injectorFactory.js');

const { defineProperty } = Object;
const watchUtil = {};
const watchUtilMethod = ['$watch', '$watchCollection', '$watchGroup'];

const eventHandleElement = '$rootScope';

for (let method of watchUtilMethod) {
    defineProperty(watchUtil, method, {
        get () {
            let injector = INJECTOR.getInjector;
            let rootScope = injector.get(eventHandleElement);
            return function (...args) {
                rootScope[method](...args);
            }
        }
    });
}

module.exports = watchUtil;
