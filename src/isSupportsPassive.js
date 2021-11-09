exports.isSupportsPassive = function isSupportsPassive() {
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
                supportsPassive = true;
            },
        });

        window.addEventListener('testPassiveListener', null, opts);
    } catch (e) {
        // No support
    }
    return supportsPassive;
};
