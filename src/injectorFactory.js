const { defineProperty } = Object;

let cachedInjector = null;

function getInjector(rootElement = document.querySelector('[ng-app]') || document.documentElement) {
    let injector = angular.element(rootElement).injector();

    if (injector) {
        cachedInjector = injector;
        return injector;
    } else {
        let childNodes = rootElement.childNodes;

        for (let node of [...childNodes]) {
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
        get() {
            return cachedInjector || getInjector();
        }
});
