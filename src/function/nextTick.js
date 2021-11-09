exports.nextTick = function nextTick(fn, delay) {
    return setTimeout(fn, delay || 0);
};
