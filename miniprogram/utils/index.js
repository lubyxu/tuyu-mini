export function formatUnixTime(unixTime, format) {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    } else if (format === 'MM-DD') {
        return `${month}-${day}`;
    } else {
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
}