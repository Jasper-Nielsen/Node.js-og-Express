import express from "express";
import fs from "fs/promises";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());




app.get("/artists", getAllArtists);

// finder returner specifik artist på baggrund af id
app.get("/artists/:id", getArtist);


app.post("/artists", postArtist);


app.put("/artists/:id", updateArtist);

app.patch("/artists/:id", toggleFavorite);

app.delete("/artists/:id", deleteArtist);



//--------------------- evt export to other module??-------------
async function getAllArtists(req, res) {
  const artists = await readFileParseJson();
  
  if (!artists) {
    res.status(404).json({ error: "Artist not found" });
  }
  res.json(artists);
}

async function getArtist(req, res) {
  const artists = await readFileParseJson();

  const result = findArtist(artists, Number(req.params.id));

  if (!result) {
    res.status(404).json({ error: "Artist not found" });
  } else {
    res.json(result);
  }
}

function addNewArtist(req, artists) {
  req.body.id = new Date().getTime();

  req.body.favorite = false;

 return  artists.push(req.body);
}

function writeArtist(artists) {
  fs.writeFile("artists.json", JSON.stringify(artists));
}

async function readFileParseJson() {
  return JSON.parse(await fs.readFile("artists.json"));
}

function findArtist(artists, id) {
  return artists.find((artist) => Number(artist.id) === id); // finder specific artist på id
}

async function postArtist(req, res) {
  const artists = await readFileParseJson();

  addNewArtist(req, artists);

  if (!req.body) {
    res
      .status(400)
      .json({ error: "No input received. Please write something" });
  } else {
    writeArtist(artists);
    res.json(artists);
  }
}

async function toggleFavorite(req, res) {
  const artists = await readFileParseJson();

  const result = findArtist(artists, Number(req.params.id));

  result.favorite = !result.favorite; // samme som

  // if (result.favorite === false) {
  //   result.favorite = true;
  // } else if (result.favorite === true) {
  //   result.favorite = false;
  // }
  if (!result) {
    res.status(404).json({ error: "No artist found" });
  } else {
    fs.writeFile("artists.json", JSON.stringify(artists));

    res.json(artists);
  }
}

 

async function updateArtist(req, res) {
  const artists = await readFileParseJson();

  const newArtistList = removeArtist(artists, Number(req.params.id)); //alle undtagen den matchende. dvs laver kopi der udelader den fundne

  newArtistList.push(req.body); //det objekt du sender fra frontend til databasen som du vil have på listen istedet. 

  if (newArtistList === artists) {
    res.status(404).json({ error: "No artist found" });
  } else {
    writeArtist(newArtistList);

    res.json(newArtistList);
  }
}

async function deleteArtist(req, res) {
  const artists = await readFileParseJson();

  const id = Number(req.params.id);

  const newArtist = removeArtist(artists, id);

  if (!newArtist) {
    res.status(404).json({ error: "No artist found" });
  } else {
    fs.writeFile("artists.json", JSON.stringify(newArtist));
    res.json(newArtist);
  }
}

function removeArtist(artists, id) {
  return artists.filter(
    (artist) => Number(artist.id) !== id // //alle undtagen den matchende. dvs laver kopi der udelader den fundne
  );
}

app.listen(3000, () => {
  console.log("server started on port 3000");
});
