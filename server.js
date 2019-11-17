const express = require('express')
const app = express();
const port = 8080;

const researcherRouter = require('./backend/researcher');
const speciesRouter = require('./backend/species');
const animalsRouter = require('./backend/animals');
const habitatsRouter = require('./backend/habitats');
const sightingsRouter = require('./backend/sightings');
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}))

app.use('/researchers', researcherRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);
app.use('/habitats', habitatsRouter);
// app.use('/sightings', sightingsRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});