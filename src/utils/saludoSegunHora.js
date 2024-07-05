export default function saludoSegunHora() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
        return 'buenos días';
    } else if (currentHour >= 12 && currentHour < 20) {
        return 'buenas tardes';
    } else {
        return 'buenas noches';
    }
}
