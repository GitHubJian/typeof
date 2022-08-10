function on(el, event, handler) {
    if (document.addEventListener) {
        if (el && event && handler) {
            el.addEventListener(event, handler, false);
        }
    } else {
        if (el && event && handler) {
            el.attachEvent('on' + event, handler);
        }
    }
}

function once(el, event, handler) {
    var called = false;
    on(el, event, function () {
        if (!called) {
            called = true;
            handler.apply(this, arguments);
        }
    });
}

function off(el, event, handler) {
    if (document.removeEventListener) {
        if (el && event) {
            el.removeEventListener(event, handler, false);
        }
    } else {
        if (el && event) {
            el.detachEvent('on' + event, handler);
        }
    }
}

function hasClass(el, classnames) {
    return el.className.match(new RegExp('(\\s|^)' + classnames + '(\\s|$)'));
}

function addClass(el, classnames) {
    if (!hasClass(el, classnames)) el.className += ' ' + classnames;
}

function removeClass(el, classnames) {
    if (hasClass(el, classnames)) {
        var reg = new RegExp('(\\s|^)' + classnames + '(\\s|$)');

        el.className = el.className.replace(reg, ' ');
    }
}

function closest(target, classnames) {
    let parent = target;

    if (hasClass(parent, classnames)) {
        return target;
    }

    while (parent && parent.tagName !== 'BODY') {
        if (hasClass(parent, classnames)) {
            return parent;
        } else {
            parent = parent.parentNode;
        }
    }

    return null;
}

function parent(target, classnames) {
    let parent = target.parentNode;

    while (parent && parent.tagName !== 'BODY') {
        if (hasClass(parent, classnames)) {
            return parent;
        } else {
            parent = parent.parentNode;
        }
    }

    return null;
}

function hyphenate(value) {
    var re = /([a-z\d])([A-Z])/g;

    return value.replace(re, '$1-$2').toLowerCase();
}

function dataset(el, name) {
    if (el.dataset) {
        return el.dataset[name];
    } else {
        return el.getAttribute('data-' + hyphenate(name));
    }
}
