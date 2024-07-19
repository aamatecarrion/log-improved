import formatDate from './formatDate';

function getDatesFromTimestamps(timestamps) {
    const timestamp1 = timestamps[0];
    const timestamp2 = timestamps[1];
    
    const dates = [];

    const startDateObject = new Date(timestamp1);
    startDateObject.setHours(0, 0, 0, 0);

    const endDateObject = new Date(timestamp2);
    endDateObject.setHours(0, 0, 0, 0);

    const sumador = new Date(startDateObject);
    while (sumador <= endDateObject) {

        dates.push(formatDate(sumador));
        sumador.setDate(sumador.getDate() + 1);

    }

    return dates
}

export default getDatesFromTimestamps