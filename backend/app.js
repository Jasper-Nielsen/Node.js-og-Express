import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/artists", async (req,res) => {
    const data = await fs.readFile("artists.json");
    const artists = JSON.parse(data);
    res.json(artists);
})

app.post("/artists", async (req, res) => {
  const newMusician = req.body;
  newMusician.id = new Date.getTime();

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  artists.push(newMusician);

  fs.writeFile("artists.json", JSON.stringify(artists));

  res.json(artists);
});

app.put("/artists/:id", async (req, res) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  const artistToUpdate = artists.find((user) => user.id === id);
  const body = request.body;
  console.log(body);
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;


  /*"name": "John Lennon",
    "birthdate": "1940-10-09",
    "activeSince": "1957",
    "genres": ["Rock", "Pop"],
    "labels": ["Apple Records"],
    "website": "https://www.johnlennon.com/",
    "image": "https://example.com/john-lennon.jpg",
    "shortDescription": "Legendary member of The Beatles." */
  fs.writeFile("artists.json", JSON.stringify(artists));
  response.json(artists);
});

app.patch("/artists:id", async (req,res) => {
   
    const id = Number(req.params.id);

    const artistList = await fs.readFile("artists.json")

    const index = artistList.findIndex( t = t.id === id); //finding the artist object 

    const newArtist = req.body;

    const oldArtist = artistList.at(index);


    
    

    if(newArtist !== undefined){
        oldArtist.name = newArtist.name
    }
    if (newArtist !== undefined) {
      oldArtist.birthdate = newArtist.birthdate;
    }
    if (newArtist !== undefined) {
      oldArtist.activeSince = newArtist.activeSince;
    }
    if (newArtist !== undefined) {
      oldArtist.genres = newArtist.genres;
    }

      if (newArtist !== undefined) {
        oldArtist.labels = newArtist.labels;
      }
      if (newArtist !== undefined) {
        oldArtist.website = newArtist.website;
      }
      if (newArtist !== undefined) {
        oldArtist.image = newArtist.image;
      }
      if (newArtist !== undefined) {
        oldArtist.shortDescription = newArtist.shortDescription;
      }
    

    res.json(artistList);
})

app.delete("/artists/:id", async (req, res) => {
    const id = Number(req.params.id);

    const data = await fs.readFile("artists.json");
    const artists = JSON.parse(data);

    const newArtists = artists.filter((artist) => artist.id === id);
    fs.writeFile("artist.json", JSON.stringify(newArtists));
    res.json(artists);
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})