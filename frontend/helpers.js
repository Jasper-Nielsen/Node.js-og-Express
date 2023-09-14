import { artistList } from "./script.js";

// why not just write artistList.lowerCase.includes(searchvalue)
function searchByName(searchValue) {
  searchValue = searchValue.toLowerCase().trim();
  return artistList.filter((artist) =>
    artist.name.toLowerCase().includes(searchValue)
  );
}


function sortByOption(list) {
  //sorts depending on what sort option the user chooses
  const sortValue =
    document.querySelector("#sort-by-select").dataset.filterValue;
  if (sortValue) {
    if (sortValue === "name") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "genres") {
      return list.sort((a, b) =>
        a.genres.toString().localeCompare(b.genres.toString()) //why .toString ??
      );
    } else if (sortValue === "activeSinceOld") {
      return list.sort((a, b) => a.activeSince - b.activeSince);
    } else if (sortValue === "activeSinceNew") {
      return list.sort((a, b) => b.activeSince - a.activeSince);
    }else if (sortValue === "birtdate"){
      list.sort((a,b) => new Date(a.birthdate) - new Date(b.birthdate));
    } else {
      return list;
    }
  } else {
    return list;
  }
}

// function sortByOption(sortValue) {
//   if (sortValue === "name") {
//     return artistList.sort((a, b) => a.name.localeCompare(b.name));
//   } else if (sortValue === "birthdate") {
//     return artistList.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate));
//   } else{return artistList}; 
// }



function filterByGenre(list){
  const filterValue = document.querySelector("#filter").dataset.filterValue;
  if (filterValue != "filterall") {
    let filteredList = list.filter((artist) =>
      artist.toString().toLowerCase().includes(filterValue)
    );

    if (filteredList !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return list;
  }
}

function filterFavorites(list){
  const filterValue =
    document.querySelector("#filterFavorite").dataset.filterValue;
  let filteredList = list.filter((artist) => artist.id in localStorage); //checks if artist id exists
if (filterValue == "filterall" || !filterValue) //why || !filterValue?? 
{
return list;
} else if(filteredList.length == 0){
  return filteredList = [];
} else {
  return filteredList;
}
}


// function filter(inputValue) {
//   let filteredList;
//   if (inputValue !== "filterall") {
//     if (inputValue === "Pop") {
//       filteredList = artistList.filter((artist) =>
//         artist.genres.includes(inputValue)
//       );
//     } else if(inputValue === "Hip-Hop") {
//       filteredList = artistList.filter((artist) =>
//         artist.genres.includes(inputValue)
//       )}else if(inputValue === "R&B") {
//       filteredList = artistList.filter((artist) =>
//         artist.genres.includes(inputValue)
//       )}
//       else if(inputValue === "Jazz") {
//       filteredList = artistList.filter((artist) =>
//         artist.genres.includes(inputValue)
//       )};
//     if (filteredList.length !== 0) {
//       return filteredList;
//     } else {
//       return (filteredList = []);
//     }
//   } else {
//     return artistList;
//   }
// }

// function filterFavorite(inputValue){
//   let filteredList;
//   if(inputValue !== "filterall" ){
//     if(inputValue === "favorite"){
//       filteredList = artistList.filter(artist=> artist.favorite === true);
//     } if(filteredList.length !== 0){
//       return filteredList;
//     } else return (filteredList = []);
//   } else {
//     return artistList;
//   }
// }


export { filterByGenre, sortByOption, searchByName, filterFavorites };
