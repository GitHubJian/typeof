exports.versionToString = function versionToString(version) {
    let versionString = '';
    for (let i = 0; i < version.length; i++) {
        versionString += (versionString ? '.' : '') + version[i];
    }
    return versionString;
};
