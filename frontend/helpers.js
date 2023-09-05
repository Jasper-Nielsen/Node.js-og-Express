import { artistList } from "./script.js";


// why not just write artistList.lowerCase.includes(searchvalue)
function searchByName(searchValue) {
  searchValue = searchValue.toLowerCase().trim();
  return artistList.filter(
    (char) => char.name.toLowerCase() === searchValue
  );

  // function checkNames(character) {
  //   return character.name.toLowerCase().includes(searchValue);
  // }
}

function sortByOption(sortValue) {
  if (sortValue === "name") {
    return artistList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "title") {
    return artistList.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "race") {
    return artistList.sort((a, b) => a.race.localeCompare(b.race));
  }
}

function filterByRace(inputValue) {
  inputValue = inputValue.toLowerCase();
  if (inputValue !== "filterall") {
    let filteredList = artistList.filter((artist) =>
      artist.inputValue.toLowerCase().includes(inputValue)
    );
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return artistList;
  }
}

function prepareData(dataObject) {
  const characterArray = [];
  for (const key in dataObject) {
    const characterObject = dataObject[key];
    characterObject.id = key;
    characterArray.push(characterObject);
  }
  console.log(characterArray);
  return characterArray;
}

export { prepareData, filterByRace, sortByOption, searchByName };
