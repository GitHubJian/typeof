const {isArrayLike} = require('./isArrayLike');
const {isArray} = require('./isArray');
const {isBuffer} = require('./isBuffer');
const {isArguments} = require('./isArguments');
const {toString} = require('./function/toString');
const {isPrototype} = require('./isPrototype');

exports.isEmpty = function isEmpty(value) {
    if (value == null) {
        return true;
    }

    if (
        isArrayLike(value) &&
        (isArray(value) ||
            typeof value === 'string' ||
            typeof value.splice === 'function' ||
            isBuffer(value) ||
            // isTypedArray(value) || TODO:
            isArguments(value))
    ) {
        return !value.length;
    }

    const tag = toString.call(value);
    if (tag == '[object Map]' || tag == '[object Set]') {
        return !value.size;
    }

    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;
    for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }

    return true;
};
