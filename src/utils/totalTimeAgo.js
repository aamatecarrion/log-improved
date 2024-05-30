function totalTimeAgo(date, unit) {
    const now = new Date();
    const givenDate = new Date(date);

    if (isNaN(givenDate.getTime())) {
        return "Invalid date";
    }

    let difference = Math.abs(now - givenDate);

    switch (unit) {
        case 'seconds':
            const totalSeconds = difference / 1000;
            return `${totalSeconds.toFixed(1)} seconds ago`;
        case 'minutes':
            const totalMinutes = difference / 60000;
            return `${totalMinutes.toFixed(2)} minutes ago`;
        case 'hours':
            const totalHours = difference / 3600000;
            return `${totalHours.toFixed(4)} hours ago`;
        case 'days':
            const totalDays = difference / 86400000;
            return `${totalDays.toFixed(5)} days ago`;
        case 'months':
            const totalMonths = difference / 2592000000;
            return `${totalMonths.toFixed(7)} months ago`;
        case 'years':
            const totalYears = difference / 31536000000;
            return `${totalYears.toFixed(8)} years ago`;
        default:
            return "Invalid unit. Use 'seconds', 'minutes', 'hours', 'days', 'months' or 'years'.";
    }
}

export default totalTimeAgo

