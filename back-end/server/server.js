const express = require('express');
const app = express();
const port = 3000

//Cors:
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))
//

//Routes:
const researchers = require('../routes/researchers');
const animals = require('../routes/animals');
const species = require('../routes/species');
const habitats = require('../routes/habitats');
const sightings = require('../routes/sightings');

app.use('/researchers', researchers);
app.use('/animals', animals);
app.use('/species', species);
app.use('/habitats', habitats);
app.use('/sightings', sightings);
//

//Port:
app.listen(port, () => {
    console.log(`http://localhost:${port}!`)
});