exports.isSupportTouch = function isSupportTouch() {
    return (
        (window.Modernizr && window.Modernizr.touch === true) ||
        (function checkTouch() {
            return !!(
                window.navigator.maxTouchPoints > 0 ||
                'ontouchstart' in window ||
                (window.DocumentTouch && doc instanceof window.DocumentTouch)
            );
        })()
    );
};
