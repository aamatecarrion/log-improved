import formatDate from './formatDate';

function getDatesFromTimestamp(timestamp) {
    const dates = [];

    const startDateObject = new Date(timestamp);
    startDateObject.setHours(0, 0, 0, 0);

    const endDateObject = new Date();
    endDateObject.setHours(0, 0, 0, 0);

    const sumador = new Date(startDateObject);
    while (sumador <= endDateObject) {

        dates.push(formatDate(sumador));
        sumador.setDate(sumador.getDate() + 1);

    }

    return dates
}

export default getDatesFromTimestamp