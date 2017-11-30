const Output = (event) => (target, name, descriptor) => {
    target.$$Output || (target.$$Output = []);

    let outputHandle = {
        event,
        handler: target[name]
    };

    target.$$Output.push(outputHandle);
};

module.exports = Output;
