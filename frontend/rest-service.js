import { prepareData } from "./helpers.js";

// const endpoint =
//   "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

const endpoint = "http://localhost:3000";

const headers =  { "Content-Type": "application/json"};

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return prepareData(data);
}



async function createArtist(
  name,
  image,
  birthdate,
  activeSince,
  genres,
  labels,
  website,
  shortDescription,
) {
  const newArtist = {
    name: name,
    image: image,
    birthDate: birthdate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    shortDescription: shortDescription,
  };
  
  const json = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: json,
    headers: headers,
  });
  return response;
}

//  Updates an existing character
async function updateArtist(
  id,
  name,
  image,
  birthdate,
  activeSince,
  genres,
  labels,
  website,
  shortDescription
) {
  const artistToUpdate = {
    name: name,
    image: image,
    birthDate: birthdate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    shortDescription: shortDescription,
  };
  // Converts the JS object to JSON string
  const json = JSON.stringify(artistToUpdate);
  // PUT fetch request with JSON in the body. Calls the specific element in resource
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "PUT",
    body: json,
    headers: headers,
  });
  return response;
}

async function deleteArtist(artistObject) {
  const id = artistObject.id;
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  return response;
}

export { getArtists, createArtist, updateArtist, deleteArtist };
