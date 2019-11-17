const express = require('express');
const cors = require('cors');
const app = express();
const port = 1337;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routers
const researcherRouter = require('./routes/researchersRoute');

app.use('/researchers', researcherRouter);

app.listen(port, () => console.log(`Server Active on http://localhost:${port}`));