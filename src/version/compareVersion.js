exports.compareVersion = function compareVersion(aVersion, bVersion) {
    if (typeof aVersion === 'string') {
        aVersion = aVersion.match(/^(\d+)\.?(\d+)?\.?(\d+)?/);
        aVersion.shift();
    }
    for (let i = 0; i < aVersion.length; i++) {
        if (aVersion[i] !== bVersion[i]) {
            return parseInt(aVersion[i]) > parseInt(bVersion[i]) ? -1 : 1;
        }
    }
    return 0;
};
