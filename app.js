const express = require('express');
const app = express();
const port = 3030;
const cors = require('cors');
const bodyParser = require('body-parser');
const researcherRouter = require('./routes/researchers');
const speciesRouter = require('./routes/species');
const animalsRouter = require('./routes/animals');
const habitatsRouter = require('./routes/habitats');
const sightingsRouter = require('./routes/sightings');





app.use(cors());

app.use(bodyParser.json());

app.use('/researchers', researcherRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);
app.use('/habitats', habitatsRouter);
app.use('/sightings', sightingsRouter);

app.listen(port, () => {
	console.log('I am the server and i await async your command');
});
