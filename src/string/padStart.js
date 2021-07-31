exports.padStart = function padStart(str, targetLength, padString) {
    if (String.prototype.padStart) {
        String.prototype.padStart.call(str, targetLength, padString);
    } else {
        targetLength = targetLength >> 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (str.length > targetLength) {
            return String(str);
        } else {
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }

            return padString.slice(0, targetLength) + String(str);
        }
    }
};
