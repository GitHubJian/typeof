exports.kebabCase = function kebabCase(str) {
    str = str.replace(/['\u2019]/g, '');
    const matchs = str.match(re);

    return matchs.reduce(function (result, word, index) {
        return result + (index ? '-' : '') + word.toLowerCase();
    }, '');
};
