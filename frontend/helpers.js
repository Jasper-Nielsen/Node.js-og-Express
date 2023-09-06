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
    return artistList.sort((a, b) => a.birthdate - b.birthdate);
  } 
}

/* <option value="filterall">All</option>
              <option value="pop">Pop</option>
              <option value="hiphop">Hip Hop</option>
              <option value="r&b">R&B</option>
              <option value="dance">Dance</option>
              <option value="favorite"=>Favorites</option></option> */

function filter(inputValue) {
  inputValue = inputValue.toLowerCase();

  let filteredList;
  if (inputValue !== "filterall") {
    if (inputValue === "pop") {
      filteredList = artistList.filter((artist) =>
        artist.genres.toLowerCase().includes(inputValue)
      );
    } else if(inputValue === "hiphop") {
      filteredList = artistList.filter((artist) =>
        artist.genres.toLowerCase().includes(inputValue)
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


export { filter, sortByOption, searchByName };
