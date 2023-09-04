import { prepareData } from "./helpers.js";

// const endpoint =
//   "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

async function getArtists() {
  const response = await fetch(`${endpoint}/artists.json`);
  const data = await response.json();
  return prepareData(data);
}

async function createArtist(
  name,
  birthDate,
  activeSince,
  genres,
  labels,
  website,
  image,
  shortDescription,
) {
  const newArtist = {
    name: name,
    birthDate: birthDate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    image: image,
    shortDescription: shortDescription,
  };
  
  const json = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists.json`, {
    method: "POST",
    body: json,
  });
  return response;
}

//  Updates an existing character
async function updateArtist(
  id,
  name,
  birthDate,
  activeSince,
  genres,
  labels,
  website,
  image,
  shortDescription
) {
  
  const artistToUpdate = {
    name: name,
    birthDate: birthDate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    image: image,
    shortDescription: shortDescription,
  };
  // Converts the JS object to JSON string
  const json = JSON.stringify(artistToUpdate);
  // PUT fetch request with JSON in the body. Calls the specific element in resource
  const response = await fetch(`${endpoint}/artists/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}

async function deleteCharacter(artistObject) {
  const id = artistObject.id;
  const response = await fetch(`${endpoint}/artists/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

export { getArtists, createArtist, updateArtist, deleteArtist };
