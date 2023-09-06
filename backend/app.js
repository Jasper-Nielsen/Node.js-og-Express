import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { readFile } from "fs";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  if (!artists) {
    return res.status(404).json({ errror: "Artist list not found" });
  }
  return res.json(artists);
});

// finder returner specifik artist på baggrund af id
app.get("/artists/:id", async (req, res) => {
  //get req med respons
  const id = Number(req.params.id); //finder id og gememr det i id
  console.log(id);
  const data = await fs.readFile(`artists.json`); // læser hele filen gemmer i data

  const artists = JSON.parse(data); //laver data om til noget js kan håndtere

  const result = artists.find((artist) => artist.id === id); // finder specific artist på id

  if (!result) {
    return res.status(404).json({ error: "Artist not found" });
  }
  return res.json(result); //giver specific artist som respons
});

app.post("/artists", async (req, res) => {
  const newMusician = req.body;
  newMusician.id = new Date().getTime();

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  console.log(artists);

  artists.push(newMusician);
  await fs.writeFile("artists.json", JSON.stringify(artists));
  res.json(artists);

  //   for (let index = 0; index < artists.length; index++) {
  //     const artist = artists[index];
  //     console.log(`artist ${artist}`);
  //     if (newMusician === artist) {
  //       res
  //         .status(404)
  //         .json({ error: "artist already exist. Use update instead" });
  //     } else {
  //       artists.push(newMusician);
  //       await fs.writeFile("artists.json", JSON.stringify(artists));
  //       res.json(artists);
  //     }
  //   }
});

app.put("/artists/:id", async (req, res) => {
  const data = await fs.readFile("artists.json");

  const artists = JSON.parse(data);

  const id = Number(req.params.id);

  const newArtist = artists.filter(
    (artist) => Number(artist.id) !== Number(id)
  ); //alle undtagen den matchende. dvs laver kopi der udelader den fundne

  newArtist.push(req.body); //det objekt du sender fra frontend til databasen som du vil have på listen istedet

  await fs.writeFile("artists.json", JSON.stringify(newArtist));
  res.json(newArtist);
});

app.patch("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);

  const artistList = await fs.readFile("artists.json");
  const artists = JSON.parse(artistList);
  // const index = artists.findIndex((t = t.id === id)); //finding the artist object

  const artist = artists.find((artist) => artist.id === id);
  if (artist.favorite === false) {
    artist.favorite = true;
  } else if (artist.favorite === true) {
    artist.favorite = false;
  }

await  fs.writeFile("artists.json", JSON.stringify(artists));

  res.json(artists);

  //   if (!index) {
  //     res
  //       .status(404)
  //       .json({ error: "No artist with that id. Create artist before editing" });
  //   } else {
  //     const newArtist = req.body;

  //     const oldArtist = artistList.at(index);

  //     if (newArtist !== undefined) {
  //       oldArtist.name = newArtist.name;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.birthdate = newArtist.birthdate;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.activeSince = newArtist.activeSince;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.genres = newArtist.genres;
  //     }

  //     if (newArtist !== undefined) {
  //       oldArtist.labels = newArtist.labels;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.website = newArtist.website;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.image = newArtist.image;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.shortDescription = newArtist.shortDescription;
  //     }
  //     if (newArtist !== undefined) {
  //       oldArtist.favorite = newArtist.favorite;
  //     }
});

app.delete("/artists/:id", async (req, res) => {
  const data = await fs.readFile("artists.json");

  const artists = JSON.parse(data);

  const id = Number(req.params.id);

  const newArtist = artists.filter(
    (artist) => Number(artist.id) !== Number(id)
  ); //alle undtagen den matchende. dvs laver kopi der udelader den fundne

  await fs.writeFile("artists.json", JSON.stringify(newArtist));
  res.json(newArtist);
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
