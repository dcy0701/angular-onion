const Watch = require('../builtIns/watch.js');

const Observable = (...options) => (target, name, descriptor) => {
    let watchMethod = '$watch';
    const watchUtilMethod = ['$watch', '$watchCollection', '$watchGroup'];

    let [expression, deep, method] = options;

    if (typeof deep !== 'boolean') {
        deep = Boolean(deep);
    }

    if(method !== undefined) {
        watchMethod = method.includes('$') ? method : '$' + options[3];
    }

    if (!watchUtilMethod.includes(watchMethod)) {
        throw new SyntaxError(`@Observable() method ${name} only support ${watchUtilMethod.join('、')} method;`);
    }

    target.$$Observable || (target.$$Observable = []);

    let observe = {
        method: watchMethod,
        expression,
        deep
    };

    Object.defineProperty(observe, 'handler', descriptor);

    target.$$Observable.push(observe);
};

module.exports = Observable;
