export default function encontrarNumeroMasCercano(array, numero) {
    if (array.length === 0) {
        throw new Error("El array no puede estar vacío");
    }

    // Inicializamos el número más cercano como el primer elemento del array
    let numeroMasCercano = array[0];
    let diferenciaMinima = Math.abs(numero - numeroMasCercano);

    // Iteramos sobre el array para encontrar el número más cercano
    for (let i = 1; i < array.length; i++) {
        let diferenciaActual = Math.abs(numero - array[i]);
        if (diferenciaActual < diferenciaMinima) {
            diferenciaMinima = diferenciaActual;
            numeroMasCercano = array[i];
        }
    }

    return numeroMasCercano;
}