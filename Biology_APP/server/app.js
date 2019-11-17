const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const researchRouter = require('./routes/researchers_route')
const speciesRouter = require('./routes/species_route')
const animalsRouter = require('./routes/animals')
const habitatsRouter = require('./routes/habitats_route')
const sightingsRouter = require('./routes/sightings')



app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/users',usersRouter);
app.use('/researcher',researchRouter);
app.use('/species',speciesRouter);
app.use('/animals',animalsRouter);
app.use('/habitats',habitatsRouter);
app.use('/sightings',sightingsRouter);


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})