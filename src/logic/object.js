export function watchAnyObject(object = {}, methods = [], callbackBefore = function () {}, callbackAfter = function () {}) {
    for (const method of methods) {
        const original = object[method].bind(object);
        const newMethod = function (...args) {
            callbackBefore(method, ...args);
            const result = original.apply(null, args);
            callbackAfter(method, ...args);
            return result;
        };
        object[method] = newMethod.bind(object);
    }
}
