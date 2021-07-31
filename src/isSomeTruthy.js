exports.isSomeTruthy = function isSomeTruthy(...args) {
    return args.some(Boolean);
};
