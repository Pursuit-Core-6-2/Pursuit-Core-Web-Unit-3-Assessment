const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

const researchersRouter = require('./routes/researchers');
const speciesRouter = require('./routes/species');
const animalsRouter = require('./routes/animals');
const habitatsRouter = require('./routes/habitats');
const sightingsRouter = require('./routes/sightings');


app.use('/researchers', researchersRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);
app.use('/habitats', habitatsRouter);
app.use('/sightings', sightingsRouter);

app.listen(port, () => {
    console.log(`MBR Server is running at port ${port}`)
});