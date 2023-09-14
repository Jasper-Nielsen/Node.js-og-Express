import express from "express";
import fs from "fs/promises";
import cors from "cors";
import {connection} from "./database.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());




app.get("/artists", getAllArtists);

// app.get("/artists", getArtistData);

// finder returner specifik artist på baggrund af id
app.get("/artists/:id", getArtist);

app.post("/artists", postArtist);

app.put("/artists/:id", updateArtist);

// app.patch("/artists/:id", toggleFavorite);

app.delete("/artists/:id", deleteArtist);



function getAllArtists(req, res) {
  // const artists = await readFileParseJson();

  const query = `SELECT * FROM artists`;
  
  connection.query(query, (err, results, fields) =>{
    if(err){
      console.log(err);
    }else{
      res.json(results)
    }
  })
  // if (!artists) {
  //   res.status(404).json({ error: "Artist not found" });
  // }
  // res.json(artists);
}

function getArtist(request, response) {
  const id = request.params.id;

  const query = `SELECT * FROM artists WHERE id=?`;
  const values = [id]; //skriver sådan fordi sql injection noget med sikkerhed!!!!
  console.log(values);
  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      response.json(results[0]);
    }
  });
  // const artists = await readFileParseJson();

  // const result = findArtist(artists, Number(req.params.id));

  // if (!result) {
  //   res.status(404).json({ error: "Artist not found" });
  // } else {
  //   res.json(result);
  // }
}

// function addNewArtist(req, artists) {
//   req.body.id = new Date().getTime();

//   req.body.favorite = false;

//   return artists.push(req.body);
// }

// function writeArtist(artists) {
//   fs.writeFile("artists.json", JSON.stringify(artists));
// }

// async function readFileParseJson() {
//   return JSON.parse(await fs.readFile("artists.json"));

//   //   const data = await fs.readFile("artists.json");
//   //   return JSON.parse(data);
// }



function postArtist(request, response) {

  const artist = request.body;
  const query = `INSERT INTO artists(name, image, birthdate, active_since,labels,website)`;
  const values = [artist.name, artist.image, artist.birthdate, artist.active_since, artist.labels, artist.website];

  connection.query(query,values, (err,results,fields)=>{
    if(err){
      console.log(err)
    }else{
      response.json(results);
    }

  
  // const artists = await readFileParseJson();

  // addNewArtist(req, artists);

  // if (!req.body) {
  //   res
  //     .status(400)
  //     .json({ error: "No input received. Please write something" });
  // } else {
  //   writeArtist(artists);
  //   res.json(artists);
  // }
})
}

//----------------------------hvordan laver man den om i sql format-------------------------------------??????
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

function updateArtist(request, response) {
  const id = request.params.id;
  const query = `UPDATE artists SET name=?, image=?, birthdate=?, active_since=?, labels=?, website=? WHERE id=?`;
  const artist= request.body;

  console.log(artist)
  const values = [artist.name, artist.image, artist.birthdate, artist.active_since, artist.labels, artist.website, id];

  connection.query(query, values, (err, results, fields) => {
    if(err){
      console.log(err);
    }else{
      response.json(results);
    }
  })


  // const artists = await readFileParseJson();

  // const newArtistList = removeArtist(artists, Number(req.params.id)); //alle undtagen den matchende. dvs laver kopi der udelader den fundne

  // newArtistList.push(req.body); //det objekt du sender fra frontend til databasen som du vil have på listen istedet.

  // if (newArtistList === artists) {
  //   res.status(404).json({ error: "No artist found" });
  // } else {
  //   writeArtist(newArtistList);

  //   res.json(newArtistList);
  // }
}

async function deleteArtist(req, res) {
const id = req.params.id;
const query = `DELETE FROM artists WHERE id=?`;
const values = [id]
connection.query(query, values,(err,results,fields) =>
{
if (err) {
  console.log(err);
} else {
  res.json(results);
}
})


  // const artists = await readFileParseJson();

  // const id = Number(req.params.id);

  // const newArtist = removeArtist(artists, id);

  // if (!newArtist) {
  //   res.status(404).json({ error: "No artist found" });
  // } else {
  //   fs.writeFile("artists.json", JSON.stringify(newArtist));
  //   res.json(newArtist);
  // }
}

// function removeArtist(artists, id) {
//   return artists.filter(
//     (artist) => Number(artist.id) !== id // //alle undtagen den matchende. dvs laver kopi der udelader den fundne
//   );
// }

// function findArtist(artists, id) {
//   return artists.find((artist) => Number(artist.id) === id); // finder specific artist på id
// }

app.listen(port, () => {
  console.log("server started on port 3000");
});
