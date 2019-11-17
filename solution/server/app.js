const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const bodyParser = require('body-parser');
const researchersRouter = require('./routes/researchers.js')
const speciesRouter = require('./routes/species.js')
const animalsRouter = require('./routes/animals.js')


app.use(cors());
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use('/researchers', researchersRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);
