exports.isAbsolutePath = function isAbsolutePath(filename) {
    return /^(?:[a-z-]+:|\/|\\|#)/i.test(filename);
};
