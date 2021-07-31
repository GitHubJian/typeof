exports.isSupportsPassive = function isSupportsPassive() {
    let supportsPassive = false;
    try {
        var opts = {};
        Object.defineProperty(opts, 'passive', {
            get: function get() {
                /* istanbul ignore next */
                supportsPassive = true;
            },
        });
        window.addEventListener('test-passive', null, opts);
    } catch (e) {}

    return supportsPassive;
};
