const {isIPhone} = require('./isIPhone');

exports.isIPhoneX = function isIPhoneX(ua) {
    if (!isIPhone(ua)) {
        return false;
    }

    const {width, height} = window.screen;
    return (
        (height === 812 && width === 375) || (height === 896 && width === 414)
    );
};
