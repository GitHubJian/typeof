const {has} = require('./has');
const {noop} = require('./noop');

exports.importScript = function importScript(url, options) {
    options = options || {};
    const script = document.createElement('script');
    const attrs = options.attrs || {};

    for (let key in attrs) {
        if (has(attrs, key)) {
            script.setAttribute(key, attrs[key]);
        }
    }

    script.src = url;

    const successCallback = options.successCallback || noop;
    const failureCallback = options.failureCallback || noop;

    script.onload = function (e) {
        successCallback && successCallback(e);
    };

    script.onerror = function (e) {
        failureCallback && failureCallback(e);
    };

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);

    return script;
};
