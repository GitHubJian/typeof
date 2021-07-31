const {toString} = require('./function/toString');

exports.isArrayBuffer = function isArrayBuffer(v) {
    return toString.call(v) === '[object ArrayBuffer]';
};
