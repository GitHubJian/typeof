const RE = /[\d.]+/g;
function rgb2hex(rgb) {
    const texMatchGroup = rgb.match(RE);
    const [r, g, b] = texMatchGroup;
    return (
        '#' +
        ('0' + Number(r).toString(16)).slice(-2) +
        ('0' + Number(g).toString(16)).slice(-2) +
        ('0' + Number(b).toString(16)).slice(-2)
    );
}

function rgba2hex(rgba) {
    const texMatchGroup = rgba.match(RE);
    const [nr, ng, nb, alpha] = texMatchGroup;
    const r =
        Math.floor(Number(alpha) * parseInt(nr)) + (1 - Number(alpha)) * 255;
    const g =
        Math.floor(Number(alpha) * parseInt(ng)) + (1 - Number(alpha)) * 255;
    const b =
        Math.floor(Number(alpha) * parseInt(nb)) + (1 - Number(alpha)) * 255;
    return (
        '#' +
        ('0' + Number(r).toString(16)).slice(-2) +
        ('0' + Number(g).toString(16)).slice(-2) +
        ('0' + Number(b).toString(16)).slice(-2)
    );
}

function rgb2rgba(rgb, alpha) {
    var [r, g, b] = rgb.match(RE);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgba2rgb(rgba) {
    const [r, g, b, alpha] = rgba.match(RE).map(v => Number(v));
    var bkg = 'rgb(255, 177, 84)';
    var bkgMatchGroup = bkg.match(RE).map(v => Number(v));
    let nr = r * alpha + bkgMatchGroup[0] * (1 - alpha);
    let ng = g * alpha + bkgMatchGroup[1] * (1 - alpha);
    let nb = b * alpha + bkgMatchGroup[2] * (1 - alpha);
    return `rgb(${nr}, ${ng}, ${nb})`;
}

function rgb2hsv(rgb) {
    let [r, g, b] = rgb.match(RE).map(v => Number(v) / 255);
    let h, s, v;
    let min = Math.min(r, g, b);
    let max = (v = Math.max(r, g, b));
    let l = (min + max) / 2;
    let difference = max - min;
    if (max == min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                h = 2.0 + (b - r) / difference;
                break;
            case b:
                h = 4.0 + (r - g) / difference;
                break;
        }
        h = Math.round(h * 60);
    }
    if (max == 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return [h, s, v];
}

function rbg2hsl(rgb) {
    let [r, g, b] = rgb.match(RE).map(v => Number(v) / 255);
    let min = Math.min(r, g, b);
    let max = Math.max(r, g, b);
    let difference = max - min;
    let h,
        s,
        l = (min + max) / 2;
    if (max === min) {
        h = 0;
        s = 0;
    } else {
        s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
        switch (max) {
            case r:
                h = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                h = 2.0 + (b - r) / difference;
                break;
            case b:
                h = 4.0 + (r - g) / difference;
                break;
        }
        h = Math.round(h * 60);
    }
    s = Math.round(s * 100); //转换成百分比的形式
    l = Math.round(l * 100);
    return [h, s, l];
}

function hsl2rgb(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    let rgb = [];
    if (s == 0) {
        rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
    } else {
        let q = l >= 0.5 ? l + s - l * s : l * (1 + s);
        let p = 2 * l - q;
        let tr = (rgb[0] = h + 1 / 3);
        let tg = (rgb[1] = h);
        let tb = (rgb[2] = h - 1 / 3);
        for (var i = 0; i < rgb.length; i++) {
            var tc = rgb[i];
            if (tc < 0) {
                tc = tc + 1;
            } else if (tc > 1) {
                tc = tc - 1;
            }
            switch (true) {
                case tc < 1 / 6:
                    tc = p + (q - p) * 6 * tc;
                    break;
                case 1 / 6 <= tc && tc < 0.5:
                    tc = q;
                    break;
                case 0.5 <= tc && tc < 2 / 3:
                    tc = p + (q - p) * (4 - 6 * tc);
                    break;
                default:
                    tc = p;
                    break;
            }
            rgb[i] = Math.round(tc * 255);
        }
    }
    return rgb;
}

function hsv2rgb(h, s, v) {
    s = s / 100;
    v = v / 100;
    let h1 = Math.floor(h / 60) % 6;
    let f = h / 60 - h1;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (h1) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function stringify(r, g, b, alpha) {
    if (!alpha) {
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

exports.colors = {
    rgb2hex,
    rgba2hex,
    rgb2rgba,
    rgba2rgb,
    rgb2hsv,
    rbg2hsl,
    hsl2rgb,
    hsv2rgb,
    stringify,
};
