const publicKey = 'fb2c8a4382cac7dd47f5a966844a1081'; 
const privateKey = 'Tb60110bc0048fdafaa7ced420d2a27a7dc584142'; 
const baseUrl = 'https://gateway.marvel.com/v1/public';

async function searchCharacter(characterName) {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey);
  const url = `${baseUrl}/characters?name=${characterName}&apikey=${publicKey}&ts=${ts}&hash=${hash}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Loading...")
    return data.data.results; 
  } catch (error) {
    console.error('Error al buscar el personaje:', error);
    return null;
  }
}


searchCharacter('Spider-Man')
  .then(results => {
    console.log('Resultados:', results);

  })
  .catch(error => {
    console.error('Error:', error);
  });
