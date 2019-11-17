const express = require('express');
const cors = require('cors')
const app = express();
const port = 4110;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
    res.send('server works')
})

//routes

//app.use('/researchers', researcherRouter)
//app.use('/species', speciesRouter)
//app.use('/animals', animalsRouter)
//app.use('/habitats', habitatsRouter)
//app.use('/sightings', sightingsRouter)


app.listen(port, () =>{
    console.log(`listening on http://localhost:${port}`)
})