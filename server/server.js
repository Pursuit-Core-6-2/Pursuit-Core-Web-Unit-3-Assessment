const express = require('express');
const cors = require('cors');

const db = require('../database/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Working')
})

const researchers = require('./routes/researchers');
const species = require('./routes/species');
const habitats = require('./routes/habitats');
const sightings = require('./routes/sightings');
const animals = require('./routes/animals');

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
app.use('/habitats', habitats);
app.use('/sightings', sightings);


const port = 3000;

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Listening at http://localhost:$${port}`);
});