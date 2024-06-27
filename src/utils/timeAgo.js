function timeAgo(date) {
    const now = new Date();
    const givenDate = new Date(date);

    if (isNaN(givenDate.getTime())) {
        return "Fecha inválida";
    }


    let difference = Math.abs(now - givenDate);

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const yearsFormat = () => {
        return years > 0 ? `${years} año${years !== 1 ? 's' : ''}, ` : ''
    }

    const monthsFormat = () => {
        const remainingMonths = months % 12;
        return remainingMonths > 0 ? `${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}, ` : ''
    }

    const daysFormat = () => {
        const remainingDays = days % 30;
        return remainingDays > 0 ? `${remainingDays} día${remainingDays !== 1 ? 's' : ''}, ` : ''
    }

    const hoursFormat = () => {
        const remainingHours = hours % 24;
        return remainingHours > 0 ? `${remainingHours} hora${remainingHours !== 1 ? 's' : ''}, ` : ''
    }

    const minutesFormat = () => {
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''}, y` : ''
    }

    const secondsFormat = () => {
        const remainingSeconds = seconds % 60;
        return `${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}`;
    }
    const result = `${yearsFormat()} ${monthsFormat()} ${daysFormat()} ${hoursFormat()} ${minutesFormat()} ${secondsFormat()}`

    return `${now > givenDate ? 'Hace ' : 'Quedan'} ${result}`
}

export default timeAgo;

