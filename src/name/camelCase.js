const {_upperFirst} = require('./_upperFirst');

exports.camelCase = function camelCase(str) {
    str = str.replace(/['\u2019]/g, '');
    const matchs = str.match(re);

    return matchs.reduce(function (result, word, index) {
        word = word.toLowerCase();

        return result + (index ? _upperFirst(word) : word);
    }, '');
};
