function resetModule () {
    if (typeof angular === 'undefined') {
        return;
    }

    let angularModule = angular.module;
    angular.module = angular.module = angular.$$onion ? angularModule : function (name, requires, configFn) {
        let result = angularModule.call(angular, name, requires, configFn);
        result.extend = function (controller) {
            let extendInfo = controller.prototype.$$extend;
            if (extendInfo.type === 'component') {
                let selector = extendInfo.selector.replace(/-([a-z])/g, (str, match) => match.toLocaleUpperCase());
                let {template, controller, bindings} = extendInfo;
                return this.component(selector, {
                    template,
                    controller,
                    bindings
                });
            } else if (extendInfo.type === 'service') {
                let name = extendInfo.name.replace(/-([a-z])/g, (str, match) => match.toLocaleUpperCase());
                let {controller} = extendInfo;
                return this.service(name, controller);
            } else if (extendInfo.type === 'controller') {
                let {controller, name} = extendInfo;
                return this.controller(name, controller);
            }
        };
        return result;
    };
    angular.$$onion = true;
}

resetModule();

module.exports = resetModule;
