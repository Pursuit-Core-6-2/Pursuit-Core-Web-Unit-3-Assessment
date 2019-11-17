const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const researchRouter = require('./routes/researchers/researchers_route')

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/users',usersRouter);
app.use('/researcher',researchRouter);

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})