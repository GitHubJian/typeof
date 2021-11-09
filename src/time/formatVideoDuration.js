exports.formatVideoDuration = function formatVideoDuration(seconds) {
    const hour = Math.floor(seconds / 3600);
    let minute = Math.floor((seconds - hour * 3600) / 60);
    let second = Math.floor((seconds - hour * 3600) % 60);

    if (minute < 10) {
        minute = `0${minute}`;
    }

    if (second < 10) {
        second = `0${second}`;
    }

    return hour ? `${hour}:${minute}:${second}` : `${minute}:${second}`;
};
