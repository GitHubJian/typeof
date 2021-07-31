exports.eq = function eq(value, other) {
    return value === other || (value !== value && other !== other);
};
