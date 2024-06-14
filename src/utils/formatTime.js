export default function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
};