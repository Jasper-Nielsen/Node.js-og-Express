import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  patchArtist,
} from "./rest-service.js";
import {
  filter,
  filterFavorite,
  sortByOption,
  searchByName,
} from "./helpers.js";

let artistList = [];

window.addEventListener("load", initApp);

function initApp() {
  updateArtistsGrid();
  document
    .querySelector("#btn-create-artist")
    .addEventListener("click", showCreateArtistDialog);
  document
    .querySelector("#form-create-artist")
    .addEventListener("submit", createArtistClicked);

  document
    .querySelector("#form-update-artist .btn-cancel")
    .addEventListener("click", cancelUpdate);

  document
    .querySelector("#form-create-artist .btn-cancel")
    .addEventListener("click", cancelCreate);

  document
    .querySelector("#form-update-artist")
    .addEventListener("submit", updateArtistClicked);

  document
    .querySelector("#sort-by-select")
    .addEventListener("change", (event) =>
      showArtists(sortByOption(event.target.value))
    );
  document
    .querySelector("#input-search")
    .addEventListener("keyup", (event) =>
      showArtists(searchByName(event.target.value))
    );
  document
    .querySelector("#input-search")
    .addEventListener("search", (event) =>
      showArtists(searchByName(event.target.value))
    );
  document
    .querySelector("#filter")
    .addEventListener("change", (event) =>
      showArtists(filter(event.target.value))
    );

  document
    .querySelector("#filterFavorite")
    .addEventListener("change", (event) =>
      showArtists(filterFavorite(event.target.value))
    );
}

function fetchArtistGrid(){
  const now = new Date.getTime();
  let lastTime;
  if(now - lastTime >= 90000 || artistList.length === 0){
    artistList = getArtists();


  }
}

// function 

async function updateArtistsGrid() {
  artistList = await getArtists();
  console.log(artistList);
  showArtists(artistList);
}

function showArtists(artistList) {
  // document.querySelector("#artists").innerHTML = "";
  if (artistList.length !== 0) {
    for (const artist of artistList) {
      showartist(artist);
    }
  } else {
    document.querySelector("#artists").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <h2 id="search-error-msg"> No artists were found. Please try again.</h2>
    `
    );
  }
}

function showartist(artistObject) {
  const html = /*html*/ `
        <article class="grid-item">

        <div class="clickable">    
            <img src="${artistObject.image}">

            <h3><b>${artistObject.name}</b></h3>
        </div>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
                <button class="btn-favorite">Favorite</button>
            </div>
        </article>
    `;
            console.log(`image: ${artistObject.image}`);
             console.log(`website: ${artistObject.website}`);

  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
  console.log(`artistStatus ${artistObject.favorite}`);

  //changes color and text on button upon clicked
  if (artistObject.favorite) {
    document
      .querySelector("#artists article:last-child .btn-favorite") // Jasper!! remember to add the specific selector #artists article:last-child
      .classList.add("favorite");
    document.querySelector(
      "#artists article:last-child .btn-favorite"
    ).textContent = "Unfavorite";
  }

  // makes item clickable and runs showArtistModal
  document
    .querySelector("#artists article:last-child .clickable")
    .addEventListener("click", () => {
      showArtistModal(artistObject);
    });

  document
    .querySelector("#artists article:last-child .btn-delete")
    .addEventListener("click", () => deleteArtistClicked(artistObject));
  document
    .querySelector("#artists article:last-child .btn-update")
    .addEventListener("click", () => updateClicked(artistObject));

  document
    .querySelector("#artists article:last-child .btn-favorite")
    .addEventListener("click", () => toggleFavoriteArtist(artistObject));
}

function showArtistModal(artistObject) {
  const modal = document.querySelector("#artist-modal");
  modal.querySelector("#artist-image").src = artistObject.image;
  modal.querySelector("#artist-name").textContent = artistObject.name;
  modal.querySelector("#artist-birth").textContent = artistObject.birthdate;
  modal.querySelector("#artist-active-since").textContent =
    artistObject.activeSince;
  modal.querySelector("#artist-genres").textContent = artistObject.genres;
  modal.querySelector("#artist-labels").textContent = artistObject.labels;
  modal.querySelector("#artist-website").textContent = artistObject.website;
  modal.querySelector("#artist-description").textContent =
    artistObject.shortDescription;

  modal.showModal();
  modal.querySelector("button").addEventListener("click", () => {
    modal.close();
  });
}

function cancelCreate(event) {
  event.preventDefault();
  document.querySelector("#dialog-create-artist").close();
}

function cancelUpdate(event) {
  event.preventDefault();
  console.log("Cancel update button clicked!");
  document.querySelector("#dialog-update-artist").close();
}

function updateClicked(artistObject) {
  //saves the form in as a variable so easier to use below
  const updateForm = document.querySelector("#form-update-artist");

  //the following makes info from object be displayed in the ModalWindow to provide
  //Feedback to the user

  updateForm.name.value = artistObject.name;
  updateForm.image.value = artistObject.image;
  updateForm.birthdate.value = artistObject.birthdate;
  updateForm.activeSince.value = artistObject.activeSince;
  updateForm.genres.value = artistObject.genres;
  updateForm.labels.value = artistObject.labels;
  updateForm.website.value = artistObject.website;
  updateForm.shortDescription.value = artistObject.shortDescription;

  //sets the id of the form to the id for the specific object
  updateForm.setAttribute("data-id", artistObject.id);

  //shows the update form
  document.querySelector("#dialog-update-artist").showModal();

  console.log("Update button clicked!");
}
// }

async function createArtistClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-create-artist");
  const name = form.name.value;
  const image = form.image.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;

  const response = await createArtist(
    name,
    image,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    shortDescription
  );
  if (response.ok) {
    document.querySelector("#dialog-create-artist").close();
    updateArtistsGrid();
    form.reset();
    hideErrorMessage();
    // event.target.parentNode.close();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Something went wrong. Please try again");
  }
}

async function updateArtistClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-update-artist");
  // extract the values from inputs in the form
  const name = form.name.value;
  const image = form.image.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;

  //gets the id of the post
  const id = form.getAttribute("data-id");

  const response = await updateArtist(
    id,
    name,
    image,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    shortDescription
  ); //match the parameters in updatepost!!!
  if (response.ok) {
    document.querySelector("#dialog-update-artist").close();
    updateArtistsGrid();
    console.log("Update artist button clicked!");
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Something went wrong. Please try again");
    event.target.parentNode.close();
  }
}

function deleteArtistClicked(artistObject) {
  console.log(artistObject);
  document.querySelector("#dialog-delete-artist-title").textContent =
    artistObject.name;

  // console.log()
  document.querySelector("#dialog-delete-artist").showModal();
  document
    .querySelector("#form-delete-artist")
    .addEventListener("submit", () => deleteArtistConfirm(artistObject));
  document
    .querySelector("#cancelDelete")
    .addEventListener("click", (event) => canceldeleteArtist(event));
}

function canceldeleteArtist(event) {
  event.preventDefault();
  document.querySelector("#dialog-delete-artist").close();
}

async function deleteArtistConfirm(artistObject) {
  const response = await deleteArtist(artistObject);

  console.log(`delete clicked`);
  if (response.ok) {
    await updateArtistsGrid();
    console.log("deleter");
    showDeleteFeedback();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
    console.log("fejl");
  }
}

function showDeleteFeedback() {
  const dialog = document.querySelector("#dialog-delete-feedback");

  document.querySelector("#dialog-delete-feedback-message").textContent;

  dialog.showModal();

  setTimeout(dialog.close, 6000);
}

function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
  console.log("Create New artist button clicked!");
}

async function toggleFavoriteArtist(artistObject) {
  const response = await patchArtist(artistObject.id);

  if (response.ok) {
    updateArtistsGrid();
  } else {
    console.log(response.status, response.statusText);
  }
}

function showErrorMessage(message) {
  document.querySelector(".error-message").textContent = message;
  document.querySelector(".error-message").classList.remove("hide");
}

function hideErrorMessage() {
  document.querySelector(".error-message").textContent = "";
  document.querySelector(".error-message").classList.add("hide");
}

export { artistList };
