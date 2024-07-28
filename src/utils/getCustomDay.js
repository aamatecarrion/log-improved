export default function getCustomDay(date){
    const day = date.getDay();
    return day === 0 ? 6 : day - 1; // Convertir domingo (0) a 6 y otros días ajustados a 0-5
};