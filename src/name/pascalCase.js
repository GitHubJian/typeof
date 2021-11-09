const {_upperFirst} = require('./_upperFirst');
const {camelCase} = require('./camelCase');

exports.pascalCase = function pascalCase(str) {
    return _upperFirst(camelCase(str));
};

console.log(exports.pascalCase('ab-c'));
