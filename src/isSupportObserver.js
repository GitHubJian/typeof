exports.isSupportObserver = function isSupportObserver() {
    return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
};
