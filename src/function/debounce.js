let now =
    Date.now ||
    function () {
        return new Date().getTime();
    };

function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;

    return function () {
        let length = Math.max(arguments.length - startIndex, 0);
        let rest = Array(length);
        let index = 0;
        for (; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0:
                return func.call(this, rest);
            case 1:
                return func.call(this, arguments[0], rest);
            case 2:
                return func.call(this, arguments[0], arguments[1], rest);
        }
        let args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    };
}

let delay = restArguments(function (func, wait, args) {
    return setTimeout(function () {
        return func.apply(null, args);
    }, wait);
}, 0);

exports.debounce = function debounce(func, wait, immediate) {
    let timeout;
    let previous;
    let args;
    let result;
    let context;

    var later = function () {
        let passed = now() - previous;
        if (wait > passed) {
            timeout = setTimeout(later, wait - passed);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
            }
            // This check is needed because `func` can recursively invoke `debounced`.
            if (!timeout) {
                args = context = null;
            }
        }
    };

    let debounced = restArguments(function (_args) {
        context = this;
        args = _args;
        previous = now();
        if (!timeout) {
            timeout = setTimeout(later, wait);
            if (immediate) {
                result = func.apply(context, args);
            }
        }
        return result;
    }, 0);

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = args = context = null;
    };

    return debounced;
};
