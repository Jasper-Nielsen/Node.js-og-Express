import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from "./rest-service.js";
import { filterByRace, sortByOption, searchByName } from "./helpers.js";

let artistList;

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
    .querySelector("#sortbyselect")
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
    .querySelector("#filterby")
    .addEventListener("change", (event) =>
      showArtists(filterByRace(event.target.value))
    );
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
  updateForm.race.value = artistObject.race; //sets value of the form title to that of the object.
  updateForm.image.value = artistObject.image;
  updateForm.birth.value = artistObject.birth;
  updateForm.culture.value = artistObject.culture;
  updateForm.death.value = artistObject.death;
  updateForm.gender.value = artistObject.gender;
  updateForm.realm.value = artistObject.realm;
  updateForm.title.value = artistObject.title;
  updateForm.weapon.value = artistObject.weapon;

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
  const race = form.race.value;
  const image = form.image.value;
  const birth = form.birth.value;
  const culture = form.culture.value;
  const death = form.death.value;
  const gender = form.gender.value;
  const realm = form.realm.value;
  const title = form.title.value;
  const weapon = form.weapon.value;

  const response = await createArtist(
    name,
    race,
    image,
    birth,
    culture,
    death,
    gender,
    realm,
    title,
    weapon
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
  const race = form.race.value;
  const image = form.image.value;
  const birth = form.birth.value;
  const culture = form.culture.value;
  const death = form.death.value;
  const gender = form.gender.value;
  const realm = form.realm.value;
  const title = form.title.value;
  const weapon = form.weapon.value;
  //gets the id of the post
  const id = form.getAttribute("data-id");

  //puts in data from from passes it to updateArtist

  const response = await updateArtist(
    id,
    name,
    race,
    image,
    birth,
    culture,
    death,
    gender,
    realm,
    title,
    weapon
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

  if (response.ok) {
    updateArtistsGrid();
    showDeleteFeedback();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

function showDeleteFeedback() {
  const dialog = document.getElementById("dialog-delete-feedback");
  const dialogMessage = document.getElementById(
    "dialog-delete-feedback-message"
  );
  dialogMessage.textContent;
  dialog.showModal();
  setTimeout(closeDialog, 1000);

  function closeDialog() {
    dialog.close();
  }
}

function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
  console.log("Create New artist button clicked!");
}

async function updateArtistsGrid() {
  artistList = await getArtists();
  showArtists(artistList);
}

function showArtists(artistList) {
  document.querySelector("#artists").innerHTML = "";
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
            <img src="${artistObject.image}" />
            <h3><b>${artistObject.name}</b></h3>
            <p>Weapon: ${artistObject.weapon}</p>
            <p>Race: ${artistObject.race}</p>
            <p>Title: ${artistObject.title}</p>
        </div>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </div>
        </article>
    `;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);

  const gridItem = document.querySelector(
    "#artists article:last-child .clickable"
  );

  gridItem.addEventListener("click", () => {
    showartistModal(artistObject);
  });

  document
    .querySelector("#artists article:last-child .btn-delete")
    .addEventListener("click", () => deleteArtistClicked(artistObject));
  document
    .querySelector("#artists article:last-child .btn-update")
    .addEventListener("click", () => updateClicked(artistObject));
}

function showartistModal(artistObject) {
  const modal = document.querySelector("#artist-modal");
  modal.querySelector("#artist-image").src = artistObject.image;
  modal.querySelector("#artist-name").textContent = artistObject.name;
  modal.querySelector("#artist-birth").textContent = artistObject.birth;
  modal.querySelector("#artist-culture").textContent =
    artistObject.culture;
  modal.querySelector("#artist-death").textContent = artistObject.death;
  modal.querySelector("#artist-gender").textContent = artistObject.gender;
  modal.querySelector("#artist-race").textContent = artistObject.race;
  modal.querySelector("#artist-realm").textContent = artistObject.realm;
  modal.querySelector("#artist-title").textContent = artistObject.title;
  modal.querySelector("#artist-weapon").textContent = artistObject.weapon;
  modal.showModal();
  modal.querySelector("button").addEventListener("click", () => {
    modal.close();
  });
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
