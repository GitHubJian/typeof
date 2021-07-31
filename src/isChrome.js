const {isEdge} = require('./isEdge');

exports.isChrome = function isChrome(ua) {
    return ua && /chrome\/\d+/.test(ua) && !isEdge;
};
