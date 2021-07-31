const {isObjectLike} = require('./isObjectLike');
const {isArrayLike} = require('./isArrayLike');

exports.isArrayLikeObject = function isArrayLikeObject(v) {
    return isObjectLike(v) && isArrayLike(v);
};
