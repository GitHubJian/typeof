exports.classify = function classify(str) {
    const re = /(?:^|[-_])(\w)/g;

    return str
        .replace(re, function (c) {
            return c.toUpperCase();
        })
        .replace(/[-_]/g, '');
};
