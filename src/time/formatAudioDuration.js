exports.formatAudioDuration = function formatAudioDuration(ms) {
    let seconds = ms / 1000;
    seconds = seconds > 0 ? seconds : 0;
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds - minute * 60);

    return minute ? `${minute}'${second}"` : `${second}"`;
};
