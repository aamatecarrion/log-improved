function convertirTimestampAFecha(timestamp) {
    const fecha = new Date(timestamp);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default convertirTimestampAFecha