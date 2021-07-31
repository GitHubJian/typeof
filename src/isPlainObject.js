const {toString} = require('./function/toString');

exports.isPlainObject = function isPlainObject(v) {
    return toString.call(obj) === '[object Object]';
};
