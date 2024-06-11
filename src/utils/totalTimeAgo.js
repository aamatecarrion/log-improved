function totalTimeAgo(date, unit) {
    const now = new Date();
    const givenDate = new Date(date);

    if (isNaN(givenDate.getTime())) {
        return "Invalid date";
    }

    let difference = Math.abs(now - givenDate);

    switch (unit) {
        case 'seconds':
            let totalSeconds = difference / 1000;
            totalSeconds = totalSeconds.toFixed(1)
            return `${totalSeconds} segundos`
        case 'minutes':
            let totalMinutes = difference / 60000;
            totalMinutes = totalMinutes.toFixed(2)
            return `${totalMinutes} minutos`
        case 'hours':
            let totalHours = difference / 3600000;
            totalHours = totalHours.toFixed(4)
            return `${totalHours} horas`
        case 'days':
            let totalDays = difference / 86400000;
            totalDays = totalDays.toFixed(5)
            return `${totalDays} días`
        case 'months':
            let totalMonths = difference / 2592000000;
            totalMonths = totalMonths.toFixed(7)
            return `${totalMonths} meses`
        case 'years':
            let totalYears = difference / 31536000000;
            totalYears = totalYears.toFixed(8)
            return `${totalYears} años`
        default:
            return "Invalid unit. Use 'seconds', 'minutes', 'hours', 'days', 'months' or 'years'.";
    }
}

export default totalTimeAgo

