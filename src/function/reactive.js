exports.reactive = function reactive(obj, key, customSetter) {
    let val = obj[key];

    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }

    const getter = property && property.get;
    const setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
    }

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            const value = getter ? getter.call(obj) : val;

            return value;
        },
        set: function (newVal) {
            const value = getter ? getter.call(obj) : val;

            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }

            if (getter && !setter) return;
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }

            if (customSetter) {
                customSetter();
            }
        },
    });
};
