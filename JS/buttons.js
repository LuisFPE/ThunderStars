/*
Aqui se metera las busquedas de las APIs relacionadas con los botones y los inputs
*/


// Traer la informacion de los dos inputs y los dos botones buscando por ID
const inputCharacter = document.getElementById('character');
const inputComic = document.getElementById('Comic');
const buttonCharacter = document.getElementById('btn-character');
const buttonComic = document.getElementById('btn-comic');


// Añadir las funciones de llamada de API
async function llamarAPI () {
    //
}


// Usar un escuchador de eventos cuando se hace click en alguno de los dos botones
// Dentro del escuchador de eventos se añade una funcion flecha con lo que hara al ser pulsado
buttonCharacter.addEventListener('click', (e) => {
    if (inputCharacter.value.length > 0) {
        alert(`Estas buscando informacion sobre ${inputCharacter.value}, lamentablemente la API aun esta en construccion y no hay informacion para mostrarte`);
    } else {
        alert(`Lamentamos informar que la API aun esta en construccion y no hay informacion para mostrarte`);
    }
});

buttonComic.addEventListener('click', (e) => {
    if (buttonComic.value.length > 0) {
        alert(`Estas buscando informacion sobre ${inputComic.value}, lamentablemente la API aun esta en construccion y no hay informacion para mostrarte`);
    } else {
        alert(`Lamentamos informar que la API aun esta en construccion y no hay informacion para mostrarte`);
    }
});