function totalTimeAgo(date, unit) {
    const now = new Date();
    const givenDate = new Date(date);

    if (isNaN(givenDate.getTime())) {
        return "Fecha inválida";
    }

    let difference = Math.abs(now - givenDate);

    switch (unit) {
        case 'segundos':
            let totalSeconds = difference / 1000;
            totalSeconds = totalSeconds.toFixed(1);
            return formatNumber(totalSeconds);
        case 'minutos':
            let totalMinutes = difference / 60000;
            totalMinutes = totalMinutes.toFixed(2);
            return formatNumber(totalMinutes);
        case 'horas':
            let totalHours = difference / 3600000;
            totalHours = totalHours.toFixed(4);
            return formatNumber(totalHours);
        case 'dias':
            let totalDays = difference / 86400000;
            totalDays = totalDays.toFixed(5);
            return formatNumber(totalDays);
        case 'meses':
            let totalMonths = difference / 2592000000;
            totalMonths = totalMonths.toFixed(7);
            return formatNumber(totalMonths);
        case 'anyos':
            let totalYears = difference / 31536000000;
            totalYears = totalYears.toFixed(8);
            return formatNumber(totalYears);
        default:
            return "Unidad inválida. Use 'segundos', 'minutos', 'horas', 'dias', 'meses' o 'anyos'.";
    }
}

function formatNumber(number) {
    return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 10 }).format(number);
}

export default totalTimeAgo;
