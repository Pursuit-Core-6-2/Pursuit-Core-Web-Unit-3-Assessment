const express = require('express');
const cors = require('cors');

const app = express();
const port = 29000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const animalsRouter = require('./Routers/Animals');
app.use('/animals', animalsRouter);

const habitatsRouter = require('./Routers/Habitats');
app.use('/habitats', habitatsRouter);

const researchersRouter = require('./Routers/Researchers');
app.use('/researchers', researchersRouter);

const sightingsRouter = require('./Routers/Sightings');
app.use('/sightings', sightingsRouter);

const speciesRouter = require('./Routers/Species');
app.use('/species', speciesRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});