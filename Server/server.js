const express = require('express');
const cors = require('cors');
const app = express();
const port = 1337;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routers
const researcherRouter = require('./routes/researchersRoute');
const speciesRouter = require('./routes/speciesRoute');
const animalsRouter = require('./routes/animalsRoute');

app.use('/researchers', researcherRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter)
app.use('/', (req, res) => res.send('Welcome to the Marine Bio Search Team'));


app.listen(port, () => console.log(`Server Active on http://localhost:${port}`));