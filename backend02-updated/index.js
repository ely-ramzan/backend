import express from "express";
import GENRES from "./constants.js";
import Joi from "joi"
import "dotenv/config";

const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT) || 3000 



// welcome page:
app.get('/vidly',(req,res) => {
    res.send("welcome on main page");
})


// get genres list:
app.get('/vidly/api/genres',(req,res) => {
    res.send(GENRES);
})

// get genre by id:
app.get('/vidly/api/genres/:id',(req,res) => {
    // check if id exists:
    const genre = GENRES.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`${req.params.id} not found`);

    // return genre with same id:
    res.send(genre)
})


// add a new genre:

    // validate genre: 
 const validateGenre = (input) => {
    const schemas = Joi.object({
        id : Joi.number(),
        genre : Joi.string().min(4).required(),
        description : Joi.string().max(50)
    })
    return schemas.validate(input);
 }

    // create post request:
 app.post("/vidly/api/genres",(req,res) => {

    // check if there is some issue with reuquest:
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // create a new obj acc to request:
    const genre = {
        id: req.body?.id || ++GENRES.length,
        genre : req.body.genre,
        description : req.body?.description || "optional desc"
    }

    // push this to your array for future use and also return
    GENRES.push(genre);
    res.send(genre);
 })

// update a genre
 //create a put request:

 app.put("/vidly/api/genres/:id",(req,res) => {
    // check if id exists:
    const genre = GENRES.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`${req.params.id} not found`);

    // check if there is some issue with reuquest:
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // update the obj accordingly:
    genre.genre = req.body.genre;
    genre.description = req.body?.description || genre.description

    // return it:
    res.send(genre);
 })

// delete a genre:
 // create a delete request
 app.delete("/vidly/api/genres/:id",(req,res) => {
    // check if id exists:
    const genre = GENRES.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`${req.params.id} not found`);

    // deleting logic from array:
    const index = GENRES.indexOf(genre);
    GENRES.splice(index,1);

    // return same obj:
    res.send(genre);
})

app.listen(port,() => {
    console.log(`listening on ${port}`)
});