const express = require('express');

const router = express.Router();

const db = require('./database');


// GET /species: Get all species.
router.get('/', async (req, res) => {
    try {
        let species = await db.any("SELECT * FROM species")
        res.status(200)
        res.json({
            payload: species,
            message: "Success. Retrieved all the species."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// GET /species/:id: Get single species.
router.get('/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let species = await db.one("SELECT * FROM species WHERE id = $1", [id])
        res.status(200)
        res.json({
            payload: species,
            message: `Success. Retrieved species with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// POST /species: Add new species.
router.post('/', async (req, res) => {
    let name = req.body.name
    let isMammal = req.body.ismammal 

    if (!name || !isMammal) {
        res.status(500)
        res.json({
            message: "Please enter all information."
        });     
    } else {
    try {
        let species = await db.any("INSERT INTO species (name, is_mammal) VALUES ($1, $2) RETURNING *", [name, isMammal])
        res.status(200)
        res.json({
            payload: species,
            message: `Success. Inserted species ${name} into species table.`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
  }
})

module.exports = router; 