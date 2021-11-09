const {has} = require('./has');

exports.importCSS = function importCSS(url, options) {
    options = options || {};
    const attrs = options.attrs || {};

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    for (let key in attrs) {
        if (has(attrs, key)) {
            link.setAttribute(key, attrs[key]);
        }
    }

    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);

    return link;
};
