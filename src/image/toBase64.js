const mime = require('mime');
const fs = require('fs');
const path = require('path');
const request = require('request');

function base64(filename, data) {
    let mimeType = mime.getType(filename);

    if (typeof data === 'string') {
        data = Buffer.from(data);
    }

    return `data:${mimeType || ''};base64,${data.toString('base64')}`;
}

function img(data) {
    let reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
    let baseType = {
        jpeg: 'jpg',
        'svg+xml': 'svg',
    };
    let match = data.match(reg);
    if (!match) {
        throw new Error('image base64 data error');
    }

    let ext = baseType[match[1]] ? baseType[match[1]] : match[1];

    return {
        extname: `.${ext}`,
        base64: match[2],
    };
}

exports.base64 = function (filename, opts = {encoding: 'utf-8'}, callback) {
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    fs.readFile(filename, opts, function (err, data) {
        if (err) return callback(err);

        callback(null, base64(filename, data));
    });
};

exports.base64Sync = function (filename, opts = {encoding: 'utf-8'}) {
    try {
        var data = fs.readFileSync(filename, opts);

        return base64(filename, data);
    } catch (e) {
        throw e;
    }
};

exports.requestBase64 = function (url, callback) {
    let mimeType = mime.getType(url);

    request(
        {
            url: url,
            encoding: null,
        },
        function (err, res, body) {
            if (err) return callback(err);

            callback(
                err,
                `data:${mimeType || ''};base64,${body.toString('base64')}`
            );
        }
    );
};

exports.img = function (data, destPath, name, callback) {
    let {extname, base64} = img(data);
    let filePath = path.join(destPath, name + extname);

    fs.writeFile(filePath, base64, {encoding: 'base64'}, function (err) {
        callback(err, filePath);
    });
};

exports.imgSync = function (data, destPath, name) {
    let {extname, base64} = img(data);
    let filePath = path.join(destPath, name + extname);

    fs.writeFileSync(filePath, base64, {encoding: 'base64'});

    return filePath;
};

exports.js = function (data, destPath, name, callback) {
    let base64 = `module.exports = ${JSON.stringify(data)}`;
    let filePath = path.join(destPath, name + '.js');

    fs.writeFile(filePath, base64, {encoding: 'utf-8'}, function (err) {
        callback(err, filePath);
    });
};

exports.jsSync = function (data, destPath, name) {
    let base64 = `module.exports = ${JSON.stringify(data)}`;
    let filePath = path.join(destPath, name + '.js');

    fs.writeFileSync(filePath, base64, {encoding: 'utf-8'});

    return filePath;
};
