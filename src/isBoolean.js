const {isObjectLike} = require('./isArrayLike');
const {toString} = require('./function/toString');

exports.isBoolean = function isBoolean(v) {
    return (
        v === true ||
        v === false ||
        (isObjectLike(v) && toString.call(v) == '[object Boolean]')
    );
};
