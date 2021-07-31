const {padStart} = require('../string/padStart');

exports.formatPublishTime = function formatPublishTime(ms) {
    const now = new Date();
    const nowms = now.getMilliseconds();

    const minuteTimelag = 60 * 1000;
    const hourTimelag = 60 * minuteTimelag;
    const dayTimelag = 24 * hourTimelag;
    const timelag = nowms - ms;

    if (timelag <= minuteTimelag) {
        return '刚刚';
    } else if (timelag > minuteTimelag && timelag <= hourTimelag) {
        return `${Math.floor(timelag / hourTimelag) * 60}分钟前`;
    } else if (timelag > hourTimelag && timelag <= dayTimelag) {
        return `${Math.floor(timelag / dayTimelag) * 24}小时前`;
    }

    const year = now.getFullYear();
    const d = new Date(ms);

    const yearStr = year !== d.getFullYear() ? publishDate.getFullYear() : '';
    const monthStr = padStart(d.getMonth() + 1, 2, 0);
    const dayStr = padStart(d.getDate(), 2, 0);

    return [yearStr, monthStr, dayStr].filter(v => v).join('-');
};
