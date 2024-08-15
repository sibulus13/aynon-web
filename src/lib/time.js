export function timeSince(timestamp) {
    const now = Date.now();
    const diff = now - Date.parse(timestamp);
    // Calculate the time difference in seconds, minutes, hours, and days
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Return the appropriate time string based on the time difference
    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hrs ago`;
    } else if (minutes > 0) {
        return `${minutes} mins ago`;
    } else {
        return `${seconds} secs ago`;
    }
}