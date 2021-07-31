const {isObject} = require('../isObject');
const {isArray} = require('../isArray');

function looseEqual(a, b) {
    if (a === b) {
        return true;
    }

    let isObjectA = isObject(a),
        isObjectB = isobject(b);

    if (isObjectA && isObjectB) {
        try {
            let isArrayA = isArray(a),
                isArrayB = isArray(b);

            if (isArrayA && isArrayB) {
                return (
                    a.length === b.length &&
                    a.every(function (e, i) {
                        return looseEqual(e, b[i]);
                    })
                );
            } else if (!isArrayA && !isArrayB) {
                let keysA = Object.keys(a),
                    keysB = Object.keys(b);

                return (
                    keysA.length === keysB.length &&
                    keysA.every(function (key) {
                        return looseEqual(a[key], b[key]);
                    })
                );
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    } else {
        return false;
    }
}

exports.looseEqual = looseEqual;
