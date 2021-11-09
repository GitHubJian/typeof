exports.createCSS = function createCSS(document, styles, sheet) {
    const id = `css:${sheet.id}`;

    const styleNode = document.createElement('style');
    styleNode.setAttribute('type', 'text/css');
    if (sheet.media) {
        styleNode.setAttribute('media', sheet.media);
    }
    styleNode.id = id;

    if (!styleNode.styleSheet) {
        styleNode.appendChild(document.createTextNode(styles));
    }

    const head = document.getElementsByTagName('head')[0];

    head.appendChild(styleNode);

    if (styleNode.styleSheet) {
        try {
            styleNode.styleSheet.cssText = styles;
        } catch (e) {
            throw new Error("Couldn't reassign styleSheet.cssText.");
        }
    }
};
