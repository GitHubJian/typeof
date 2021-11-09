exports.isSupportGestures = function isSupportGestures() {
    return 'ongesturestart' in window;
};
