exports.capitalize = function (str) {
    return str.chatAt(0).toUpperCase() + str.substring(1).toLowerCase();
};
