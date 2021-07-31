exports.isSupportObserver = function isSupportObserver() {
    return !!(window.IntersectionObserver && window.MutationObserver);
};
