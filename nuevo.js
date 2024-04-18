// Crear un localStorage si no existe
let confirmarPrimero = localStorage.getItem('primero');
let confirmarSegundo = localStorage.getItem('segundo');
if (confirmarPrimero === null || confirmarSegundo === null) {
    localStorage.setItem('primero', 0);
    localStorage.setItem('segundo', 20);
}

cargaPersonaje();
function cargaPersonaje() {
    const cargaPrimero = localStorage.getItem('primero');
    const cargaSegundo = localStorage.getItem('segundo');

    const buscaSection = document.getElementById('cargaSeleccion');
    buscaSection.innerHTML = '';

    let cargaDIV = document.createElement('div');
    cargaDIV.setAttribute('id', 'cargaDIV');

    let cargaH4 = document.createElement('h4');
    cargaH4.setAttribute('id', 'cargaH4')
    cargaH4.innerText = `Pagina desde ${cargaPrimero} hasta ${cargaSegundo}`;

    cargaDIV.appendChild(cargaH4);
    buscaSection.appendChild(cargaDIV);
}

localStorage.setItem('primero', 0);
localStorage.setItem('segundo', 20)

let primero = localStorage.getItem('primero');
let segundo = localStorage.getItem('segundo')
primero = parseInt(primero);
segundo = parseInt(segundo);

// Uso de los botones para sumar o restar personajes
const botonMas = document.getElementById('mas');
const botonMenos = document.getElementById('menos');


botonMas.addEventListener('click', (e) => {
    primero = localStorage.getItem('primero');
    segundo = localStorage.getItem('segundo');
    primero = parseInt(primero);
    segundo = parseInt(segundo);

    primero += 20;
    segundo += 20;

    localStorage.setItem('primero', primero);
    localStorage.setItem('segundo', segundo);
    cargaPersonaje();
    getPersonajes(primero, segundo);
})

botonMenos.addEventListener('click', (e) => {
    primero = localStorage.getItem('primero');
    segundo = localStorage.getItem('segundo');
    primero = parseInt(primero);
    segundo = parseInt(segundo);

    primero -= 20;
    segundo -= 20;

    if (primero < 0) {
        primero = 0;
        segundo = 20;
    }

    localStorage.setItem('primero', primero);
    localStorage.setItem('segundo', segundo);
    cargaPersonaje();
    getPersonajes(primero, segundo);
})

// Funcion de busqueda de personajes para que aparezcan en el desplegable
getPersonajes(primero, segundo);
async function getPersonajes(primero, segundo){
    // Eliminar las busquedas anteriores
    let selectDelete = document.getElementById('names');
    selectDelete.innerHTML = `<option class='' id="vacio" value="">Seleccione un personaje</option>`;


    // Traer informacion del localStorage para el bucle de busquedas
    let comprobarPrimero = localStorage.getItem('primero');
    let comprobarSegundo = localStorage.getItem('segundo');
    comprobarPrimero = parseInt(comprobarPrimero);
    comprobarSegundo = parseInt(comprobarSegundo);


    for (let i = primero; i < segundo; i+=20) {
        let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef" ;
        const url = new URL(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=062384275ca95f55e7ce656b34dab77a&hash=${strhash}&offset=${i}`)

        const response = await fetch(url.toString());
        const data =  await response.json();

        // Bucle para meter todos los nombres llegados de la API al desplegable
        let names = data.data.results;
        for (let i = 0; names.length > i; i++) {
            let optionCreate = document.createElement('option');
            optionCreate.setAttribute('value', names[i].name);
            optionCreate.setAttribute('class', 'nombre');
            optionCreate.setAttribute('id', names[i].name);
            let selectBuscar = document.getElementById('names');
            selectBuscar.appendChild(optionCreate);
            let optionBuscar = document.getElementById(names[i].name);
            optionBuscar.innerText = names[i].name;
        }
    }
    cargaDelay();
}

// Funcion de espera que da margen a cargar todos los personajes y despues hace busqueda de la seleccion del desplegable
cargaDelay();
function cargaDelay() {
    setTimeout(() => {
        const buscarEleccion = document.getElementsByClassName('nombre');
        for (let i = 0; buscarEleccion.length > i; i++) {
            let buscarID = buscarEleccion[i].id;
            const optionBuscar = document.getElementById(buscarID);
            optionBuscar.addEventListener('click', (e) => {
                const optionDisable = document.getElementById('vacio');
                optionDisable.setAttribute('disabled', 'yes');
                getPersonajeSeleccionado(optionBuscar.id);
            })
        }

    }, 1000 * 2);
}


// Crear varios elementos de HTML para usar con la info de la API con el personaje
const MarvelCard = document.getElementById('personajes');

let img_create = document.createElement('img');
img_create.setAttribute('id', 'img_create');

let name_create = document.createElement('h3');
name_create.setAttribute('id', 'name_create');

let description_create = document.createElement('p');
description_create.setAttribute('id', 'description_create')

let personajeWrap = document.createElement('div');
personajeWrap.setAttribute('id', 'personaje');

personajeWrap.appendChild(img_create);
personajeWrap.appendChild(name_create);
personajeWrap.appendChild(description_create);

MarvelCard.appendChild(personajeWrap);



// Funcion de llamada de la API con el nombre del personaje en cuestion que ha sido seleccionado
// Crea la card del personaje y a la vez crea varias cards de los comics
// Solo hare que carguen 10 comics, si tiene mas no apareceran
async function getPersonajeSeleccionado(name) {
    // Aqui el personaje seleccionado
    let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef";
    const url = new URL(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=062384275ca95f55e7ce656b34dab77a&hash=${strhash}&name=${name}`)

    const response = await fetch(url.toString());
    const data =  await response.json();

    // Recopilacion de los datos del personaje para crear una pequeña ficha en el HTML
    let MarvelImage = data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
    let MarvelName = data.data.results[0].name;
    let MarvelDescription = data.data.results[0].description;
    MarvelDescription.length > 2 ? MarvelDescription : MarvelDescription = 'Sin descripcion de API';

    img_create.setAttribute('src', MarvelImage);
    name_create.setAttribute('value', MarvelName);
    name_create.innerText = MarvelName;
    description_create.innerText = MarvelDescription;

    // Recopilar la informacion de los comis relacionados con el personaje seleccionado
    const MarvelComics = data.data.results[0].comics.items;
    let MarvelComics_cantidad = MarvelComics.length;
    MarvelComics_cantidad > 25 ? MarvelComics_cantidad = 25 : MarvelComics_cantidad;

    if (MarvelComics[0] === undefined) {
        const buscar_comicNO = document.getElementById('cards');
        buscar_comicNO.innerHTML = '';
        comicsNO();
    } else {
        // Eliminar los datos de la ultima busqueda
        const borrar_comic = document.getElementById('cards');
        borrar_comic.innerHTML = '';

        // Bucle para sacar un listado de los comics asociados
        for (let i = 0; MarvelComics_cantidad > i; i++) {
            MarvelComics_name = MarvelComics[i].name;
            MarvelComics_url = MarvelComics[i].resourceURI;

            // Crear funcion async para llamar a la API con las URL que me da junto con los comics
            getComics();
            async function getComics() {
                let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef";
                const url = new URL(`${MarvelComics_url}?ts=1&apikey=062384275ca95f55e7ce656b34dab77a&hash=${strhash}`)
            
                const response = await fetch(url.toString());
                const data =  await response.json();


                // Sacar los datos concretos que necesito sobre los comics
                let comic_name = data.data.results[0].title;

                let comic_descriptionCantidad = data.data.results[0].textObjects;
                comic_descriptionCantidad = comic_descriptionCantidad.length;
                let comic_description;
                comic_descriptionCantidad > 0 ? comic_description = data.data.results[0].textObjects[0].text : comic_description = 'Sin descripcion desde la API';

                let comic_image = `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`;

                

                // Crear los elementos necesarios para el HTML
                let comic_imgCreate = document.createElement('img');
                comic_imgCreate.setAttribute('src', comic_image);
                comic_imgCreate.setAttribute('class', 'comic_image')

                let comic_nameCreate = document.createElement('h3');
                comic_nameCreate.setAttribute('class', 'comic_name');
                comic_nameCreate.innerText = comic_name;

                let comic_descriptionCreate = document.createElement('p', comic_description);
                comic_descriptionCreate.setAttribute('class', 'comic_description');
                comic_descriptionCreate.innerHTML = comic_description;

                let comic_cardCreate = document.createElement('div');
                comic_cardCreate.setAttribute('class', 'comic')

                const buscar_comic = document.getElementById('cards');

                comic_cardCreate.appendChild(comic_imgCreate);
                comic_cardCreate.appendChild(comic_nameCreate);
                comic_cardCreate.appendChild(comic_descriptionCreate);

                buscar_comic.appendChild(comic_cardCreate);
            }
        }
    }
};


// Funcion para cuando un personaje no tiene comics en la API
function comicsNO() {
    let comic_nameCreate = document.createElement('h3');
    comic_nameCreate.setAttribute('class', 'comic_name');
    comic_nameCreate.innerText = 'El personaje seleccionado no tiene ningun comic asociado desde la API';

    let comic_cardCreate = document.createElement('div');
    comic_cardCreate.setAttribute('class', 'comic')

    const buscar_comic = document.getElementById('cards');

    comic_cardCreate.appendChild(comic_nameCreate);
    buscar_comic.appendChild(comic_cardCreate);
}

