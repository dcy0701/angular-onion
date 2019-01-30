const INJECTOR  = require('./../injectorFactory.js');

const { defineProperty } = Object;

const eventHandleElement = '$rootScope';

let eventBus = {};

const eventsPreset = ['$emit', '$on', '$broadcast'];

for (let event of eventsPreset) {
    defineProperty(eventBus, event, {
        get () {
            let injector = INJECTOR.getInjector;
            let rootScope = injector.get(eventHandleElement);
            return function (...args) {
                return rootScope[event](...args);
            }
        }
    });
}


module.exports = eventBus;
