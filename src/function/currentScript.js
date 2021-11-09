exports.currentScript = function currentScript(window) {
    const document = window.document;
    return (
        document.currentScript ||
        (() => {
            const scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })()
    );
};
