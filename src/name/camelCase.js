exports.camelCase = function camelCase(str) {
    const re = /-(\w)/g;
    return str.replace(re, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
};
