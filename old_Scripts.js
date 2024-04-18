
// Codigo para los Personajes

getDataPersonaje();
async function getDataPersonajes(){
    let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef" ;
    const url = new URL("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=062384275ca95f55e7ce656b34dab77a&hash=" + strhash)

    const response = await fetch(url.toString());
    const data =  await response.json();

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

    addEventsPersonajes(data.data.results)

}

function addEventsPersonajes(events){
    const divEvents = document.getElementById("presentacion");
    events.forEach((event) => {
        const personaje = document.createElement("h3");
        personaje.innerText= "Name: "+event.name + ", id: " + event.id;
        personaje.setAttribute("class", "personajesList");
        divEvents.appendChild(personaje);
    });
}

async function getDataPersonaje(nombrePersonaje){
    let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef" ;
    const url = new URL("https://gateway.marvel.com:443/v1/public/characters?ts=1&name="+nombrePersonaje+"&apikey=062384275ca95f55e7ce656b34dab77a&hash=" + strhash)

    const response = await fetch(url.toString());
    const data =  await response.json();
    addEventsPersonaje(data.data.results)

}

function addEventsPersonaje(data){
    let event = data[0];
    const divEvents = document.getElementById("presentacion");
    divEvents.innerHTML = "";
     
    const card = document.createElement("div");
    card.setAttribute("class", "card");
  
    card.style.width = "18rem"; 
    card.style.backgroundColor = "Whitesmoke";
    card.style.borderRadius = "10px";
    card.style.borderStyle = "solid";
    card.style.borderColor = "gray";
    card.style.borderWidth = "2.5px";

    const image = document.createElement("img");
    image.setAttribute("class", "card-img-top");
    let imgpath = event.thumbnail.path + "/" + "standard_medium" + "." + event.thumbnail.extension;
    image.src = imgpath;

    const subcard = document.createElement("div");
    card.setAttribute("class", "card-body");

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = event.name;
    title.style.marginTop = "1vh";

    const description = document.createElement("p");
    description.setAttribute("class", "card-text");
    description.innerText = event.description;

    const id = document.createElement("h6");
    id.setAttribute("class", "card-subtitle mb-2 text-muted");
    id.innerText = "Id: " + event.id;

    subcard.appendChild(title);
    subcard.appendChild(description);
    subcard.appendChild(id);

    card.appendChild(image);
    card.appendChild(subcard);

    divEvents.appendChild(card);
}

function BuscarPersonajes(){
    let presentacion = document.getElementById("presentacion");
    presentacion.innerHTML = "";

    let valorPersonaje = document.getElementById("input-personajes").value;
    if (valorPersonaje == "All") {
        getDataPersonajes();
    }else{
        getDataPersonaje(valorPersonaje);
    }
}

// Codigo para los comics

async function getDataComics(){
    let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef" ;
    const url = new URL("https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=062384275ca95f55e7ce656b34dab77a&hash=" + strhash)

    const response = await fetch(url.toString());
    const data =  await response.json();
    addEventsComics(data.data.results)

}

function addEventsComics(events){
    const divEvents = document.getElementById("presentacion");
    events.forEach((event) => {
        const comics = document.createElement("h3");
        comics.innerText= "Title: "+event.title + ", id: " + event.id;
        comics.setAttribute("class", "comicsList");
        divEvents.appendChild(comics);
    });
}

async function getDataComic(nombreComic){
    let strhash = "9ee928aa29d4ce8bb3cd70c67a2255ef" ;
    const url = new URL("https://gateway.marvel.com:443/v1/public/comics?ts=1&title="+nombreComic+"&orderBy=title&apikey=062384275ca95f55e7ce656b34dab77a&hash=" + strhash)

    const response = await fetch(url.toString());
    const data =  await response.json();
    addEventsComic(data.data.results)

}

function addEventsComic(event){
    const divEvents = document.getElementById("presentacion");
    divEvents.innerHTML = "";

    event.forEach(event => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
    
        card.style.width = "18rem"; 
        card.style.backgroundColor = "Whitesmoke";
        card.style.borderRadius = "10px";
        card.style.borderStyle = "solid";
        card.style.borderColor = "gray";
        card.style.borderWidth = "2.5px";
        card.style.margin = "2%"

        const image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        let imgpath = event.thumbnail.path + "/" + "standard_medium" + "." + event.thumbnail.extension;
        image.src = imgpath;

        const subcard = document.createElement("div");
        card.setAttribute("class", "card-body");

        const title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.innerText = event.title;
        title.style.marginTop = "1vh";

        const description = document.createElement("p");
        description.setAttribute("class", "card-text");
        description.innerText = event.description;

        const id = document.createElement("h6");
        id.setAttribute("class", "card-subtitle mb-2 text-muted");
        id.innerText = "Id: " + event.id;

        subcard.appendChild(title);
        subcard.appendChild(description);
        subcard.appendChild(id);

        card.appendChild(image);
        card.appendChild(subcard);

        divEvents.appendChild(card);
    });

}

function BuscarComics(){
    let presentacion = document.getElementById("presentacion");
    presentacion.innerHTML = "";

    let valorComics = document.getElementById("input-comics").value;
    if (valorComics == "All") {
        getDataComics();
    }else{
        getDataComic(valorComics);
    }
}