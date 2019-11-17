const express = require('express');
const cors = require('cors')
const app = express();
const port = 4110;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const researcherRouter = require('./routes/researcherRouter.js')
const speciesRouter = require('./routes/speciesRouter.js')
const animalsRouter = require('./routes/animalsRouter.js')
const habitatsRouter = require('./routes/habitatsRouter.js')
const sightingsRouter = require('./routes/sightingsRouter.js')

//routes
app.use('/researchers', researcherRouter)
app.use('/species', speciesRouter)
app.use('/animals', animalsRouter)
app.use('/habitats', habitatsRouter)
app.use('/sightings', sightingsRouter)


app.listen(port, () =>{
    console.log(`listening on http://localhost:${port}`)
})