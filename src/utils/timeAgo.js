function timeAgo(date) {
    const now = new Date();
    const givenDate = new Date(date);

    if (isNaN(givenDate.getTime())) {
        return "Invalid date";
    }

    let difference = Math.abs(now - givenDate);

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    const result = `${years} years, ${months % 12} months, ${days % 30} days, ${hours % 24} hours, ${minutes % 60} minutes and ${seconds % 60} seconds`

    return result;
}

export default timeAgo