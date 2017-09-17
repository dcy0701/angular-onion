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

    // 为什么判断 undefined. 因为babel转码会把es module的this转化为 undefined; 并且格式化
    if (typeof expression !== 'string' && expression.toString().includes('undefined.')) {
        let line = expression.toString().split('\n').filter(line => line.includes('return'))[0];
        expression = line.toString().replace('return', '').replace('undefined.', '$ctrl.');
    }

    let observe = {
        method: watchMethod,
        expression,
        handler: target[name],
        deep
    };

    target.$$Observable.push(observe);
};

module.exports = Observable;
