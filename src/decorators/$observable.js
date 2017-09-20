const Watch = require('../builtIns/watch.js');

const Observable = (...options) => (target, name, descriptor) => {
    // options 1. expression, 2. deep, 3. method(optional watch, watchGroup..etc)
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

    // $$Observable Watch 的队列
    target.$$Observable || (target.$$Observable = []);

    let observe = {
        method: watchMethod,
        expression,
        handler: target[name],
        deep
    };

    target.$$Observable.push(observe);
};

module.exports = Observable;
