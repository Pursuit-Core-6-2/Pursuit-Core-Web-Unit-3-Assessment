const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const researchersRouter = require('./routes/researchers.js');
const speciesRouter = require('./routes/species.js');
const animalsRouter = require('./routes/animals.js');

const habitatsRouter = require('./routes/habitats.js');
const sightingsRouter = require('./routes/sightings.js');



app.use('/researchers', researchersRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);

app.use('/habitats', habitatsRouter);
app.use('/sightings', sightingsRouter);




app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`)
})


app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found on Holding server. Try again.');
});


