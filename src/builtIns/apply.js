const INJECTOR  = require('./../injectorFactory.js');

const { defineProperty } = Object;

const eventHandleElement = '$rootScope';

const apply = () => {
    let injector = INJECTOR.getInjector;
    let rootScope = injector.get(eventHandleElement);
    if (!rootScope.$$phase) {
        rootScope.$digest();
    }
};

defineProperty(exports, '$apply', {
        get() {
            return apply;
        }
});
