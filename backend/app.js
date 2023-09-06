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
    return res.status(404).json({ error: "Artist not found" });
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
    res.status(404).json({ error: "Artist not found" });
  } else {
    res.json(result); //giver specific artist som respons
  }
});

app.post("/artists", async (req, res) => {
  const newMusician = req.body;
  newMusician.id = new Date().getTime();
  newMusician.favorite = false;

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  console.log(artists);

  artists.push(newMusician);

  if (!newMusician) {
    res
      .status(400)
      .json({ error: "No input received. Please write something" });
  } else {
    await fs.writeFile("artists.json", JSON.stringify(artists));
    res.json(artists);
  }
});

app.put("/artists/:id", async (req, res) => {
  const data = await fs.readFile("artists.json");

  const artists = JSON.parse(data);

  const id = Number(req.params.id);

  const newArtist = artists.filter(
    (artist) => Number(artist.id) !== Number(id)
  ); //alle undtagen den matchende. dvs laver kopi der udelader den fundne

  newArtist.push(req.body); //det objekt du sender fra frontend til databasen som du vil have på listen istedet

  if (newArtist === artists) {
    res.status(404).json({ error: "No artist found" });
  } else {
    await fs.writeFile("artists.json", JSON.stringify(newArtist));
    res.json(newArtist);
  }
});

app.patch("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);

  const artistList = await fs.readFile("artists.json");
  const artists = JSON.parse(artistList);

  const result = artists.find((artist) => Number(artist.id) === id);
  if (result.favorite === false) {
    result.favorite = true;
  } else if (result.favorite === true) {
    result.favorite = false;
  }
console.log(artists)

  if (!result) {
    res.status(404).json({ error: "No artist found" });
  } else {
    await fs.writeFile("artists.json", JSON.stringify(artists));

    res.json(artists);
  }
});

app.delete("/artists/:id", async (req, res) => {
  const data = await fs.readFile("artists.json");

  const artists = JSON.parse(data);

  const id = Number(req.params.id);

  const newArtist = artists.filter(
    (artist) => Number(artist.id) !== Number(id)
  ); //alle undtagen den matchende. dvs laver kopi der udelader den fundne

  if (!newArtist) {
    res.status(404).json({ error: "No artist found" });
  } else {
    await fs.writeFile("artists.json", JSON.stringify(newArtist));
    res.json(newArtist);
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
