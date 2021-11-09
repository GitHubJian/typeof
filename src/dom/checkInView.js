function offset(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;

    while (el.offsetParent) {
        el = el.offsetParent;
        if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
            top += el.offsetTop;
            left += el.offsetLeft;
        } else {
            top += el.offsetTop + el.clientTop;
            left += el.offsetLeft + el.clientLeft;
        }
    }

    return {
        left: left,
        top: top,
    };
}

function checkInView(dom) {
    var flag = false;
    var wh = window.innerHeight;
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    var imgHeight = dom.clientHeight
        ? dom.clientHeight
        : dom.parentNode.clientHeight;

    var offsetTop = offset(dom).top;
    if (offsetTop >= st && offsetTop <= st + wh) {
        flag = true;
    } else if (
        offsetTop < st &&
        offsetTop + imgHeight > st &&
        offsetTop + imgHeight < st + wh
    ) {
        flag = true;
    }

    if (flag) {
        var rect = dom.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            return true;
        }
    }

    return false;
}

exports.checkInView = checkInView;
