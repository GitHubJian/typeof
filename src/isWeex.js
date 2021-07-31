exports.isWeex = function isWeex() {
    typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
};
