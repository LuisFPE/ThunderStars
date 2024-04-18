/*
Aqui se metera las busquedas de las APIs relacionadas con los botones y los inputs
*/


// Traer la informacion de los dos inputs y los dos botones buscando por ID
const inputCharacter = document.getElementById('character');
const inputComic = document.getElementById('Comic');
const buttonCharacter = document.getElementById('btn-character');
const buttonComic = document.getElementById('btn-comic');


// Añadir las funciones de llamada de API
async function getMarvels() {
    const url = new URL("https://gateway.marvel.com:443/v1/public/characters?apikey=295966637e5c92693cf21758d4481539");
    url.searchParams.append('name', inputCharacter.value);
    url.searchParams.append('hash', 'd9ff78a23b918b8ffbf54eec573c8c39')
    url.searchParams.append('ts', '1');
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
        alert(error);
    }
}

async function getMarvel(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error)
    }
}



// Usar un escuchador de eventos cuando se hace click en alguno de los dos botones
// Dentro del escuchador de eventos se añade una funcion flecha con lo que hara al ser pulsado
buttonCharacter.addEventListener('click', (e) => {
    if (inputCharacter.value.length > 0) {
        //alert(`Estas buscando informacion sobre ${inputCharacter.value}, lamentablemente la API aun esta en construccion y no hay informacion para mostrarte`);
        getMarvels();
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