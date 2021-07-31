const {isObjectLike} = require('./isObjectLike');
const {toString} = require('./function/toString');

exports.isRegExp = function isRegExp(v) {
    return isObjectLike(v) && toString.call(v) == '[object RegExp]';
};
