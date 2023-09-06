import { artistList } from "./script.js";

// why not just write artistList.lowerCase.includes(searchvalue)
function searchByName(searchValue) {
  searchValue = searchValue.toLowerCase().trim();
  return artistList.filter((char) =>
    char.name.toLowerCase().includes(searchValue)
  );

  // function checkNames(character) {
  //   return character.name.toLowerCase().includes(searchValue);
  // }
}

function sortByOption(sortValue) {
  if (sortValue === "name") {
    return artistList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "birthdate") {
    return artistList.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate));
  } else{return artistList}; 
}


function filter(inputValue) {


  let filteredList;
  if (inputValue !== "filterall") {
    if (inputValue === "Pop") {
      filteredList = artistList.filter((artist) =>
        artist.genres.includes(inputValue)
      );
    } else if(inputValue === "Hip-Hop") {
      filteredList = artistList.filter((artist) =>
        artist.genres.includes(inputValue)
      )}else if(inputValue === "R&B") {
      filteredList = artistList.filter((artist) =>
        artist.genres.includes(inputValue)
      )}
      else if(inputValue === "Jazz") {
      filteredList = artistList.filter((artist) =>
        artist.genres.includes(inputValue)
      )};
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return artistList;
  }
}

function filterFavorite(inputValue){
  let filteredList;
  if(inputValue !== "filterall" ){
    if(inputValue === "favorite"){
      filteredList = artistList.filter(artist=> artist.favorite === true);
    } if(filteredList.length !== 0){
      return filteredList;
    } else return (filteredList = []);
  } else {
    return artistList;
  }
}


export { filter, sortByOption, searchByName, filterFavorite };
