import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());


//-------------backup
// import express from "express";
// import cors from "cors";
// import fs from "fs/promises";

// const app = express();
// const port = 6000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// app.get("/artists", getArtistsData);

// export async function getArtists(path) {
//   const data = await fs.readFile(path);
//   return JSON.parse(String(data));
// }

// async function getArtistsData(req, res) {
//   const artist = await getArtists("artists.json");
//   res.json(artist);
// }

// app.listen(port, () => {
//   console.log(`Server started on port http://localhost:${port}`);
// });

app.get("/artists", getAllArtists);

// app.get("/artists", getArtistData);

// finder returner specifik artist på baggrund af id
app.get("/artists/:id", getArtist);

app.post("/artists", postArtist);

app.put("/artists/:id", updateArtist);

app.patch("/artists/:id", toggleFavorite);

app.delete("/artists/:id", deleteArtist);

//--------------------- evt export to other module??-------------

// async function getArtistData(req, res) {
//   const artist = await getArtist("artists.json");
//   res.json(artist);
// }

// async function getArtist(path) {
//   try {
//     const data = await fs.readFile(path);
//     return JSON.parse(String(data));
//   } catch (error) {
//     throw error;
//   }
// }

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

  return artists.push(req.body);
}

function writeArtist(artists) {
  fs.writeFile("artists.json", JSON.stringify(artists));
}

async function readFileParseJson() {
  return JSON.parse(await fs.readFile("artists.json"));

  //   const data = await fs.readFile("artists.json");
  //   return JSON.parse(data);
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

app.listen(port, () => {
  console.log("server started on port 3000");
});
