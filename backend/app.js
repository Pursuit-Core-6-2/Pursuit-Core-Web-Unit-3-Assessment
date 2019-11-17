const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db/index.js')

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const researchersRouter = require('./routes/Researchers.js')
const speciesRouter = require('./routes/Species.js')
const animalsRouter = require('./routes/Animals.js')
const habitatsRouter = require('./routes/Habitats.js')
const sightingsRouter = require('./routes/Sightings.js')

app.use('/researchers', researchersRouter)
app.use('/species', speciesRouter)
app.use('/animals', animalsRouter)
app.use('/habitats', habitatsRouter)
app.use('/sightings', sightingsRouter)


app.get('/', (req, res) => {
    res.send('Welcome to the Marine Life Database')
})


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})





module.exports = app