const {has} = require('./has');
const {noop} = require('./noop');

exports.importScript = function importScript(url, options) {
    options = options || {};
    const inject = options.inject || 'head';
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

    const parent = document.getElementsByTagName(
        inject === 'head' ? 'head' : 'body'
    )[0];
    parent.appendChild(script);

    return script;
};
