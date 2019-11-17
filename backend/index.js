const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.json());

const researcherRouter = require('./routes/researchers');
const speciesRouter = require('./routes/species');
const animalRouter = require('./routes/animals');
const habitatsRouter = require('./routes/habitat');
const sightingsRouter = require('./routes/sightings');


app.use('/researchers', researcherRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalRouter);
app.use('/habitats', habitatsRouter);
app.use('/sightings', sightingsRouter);


app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})