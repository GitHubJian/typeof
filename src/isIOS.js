exports.isIOS = function isIOS(ua) {
    return ua && /iphone|ipad|ipod|ios/.test(ua);
};
