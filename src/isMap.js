const {isObjectLike} = require('./isObjectLike');
const {toString} = require('./function/toString');

exports.isMap = function isMap(v) {
    return isObjectLike(v) && toString.call(v) == '[object Map]';
};
