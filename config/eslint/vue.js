const vue = require('@ecomfe/eslint-config/vue');

const config = {
    extends: ['@ecomfe/eslint-config'],
    ...vue,
};

config.parserOptions = config.parserOptions || {};
config.parserOptions.parser = '@typescript-eslint/parser';

module.exports = config;
