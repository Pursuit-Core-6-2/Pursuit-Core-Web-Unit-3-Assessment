const express = require('express');

const router = express.Router();

const db = require('./database');



// GET /animals: Get all animals.
router.get('/', async (req, res) => {
    try {
        let animals = await db.any("SELECT * FROM animals")
        res.status(200)
        res.json({
            payload: animals,
            message: "Success. Retrieved all the animals."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// GET /animals/:id: Get single animal.
router.get('/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let species = await db.one("SELECT * FROM animals WHERE id = $1", [id])
        res.status(200)
        res.json({
            payload: species,
            message: `Success. Retrieved animal with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// POST /animals: Add new animal.
router.post('/', async (req, res) => {
    let speciesId = req.body.speciesId
    let name = req.body.name
    try {
        let species = await db.any("INSERT INTO animals (species_id, nickname) VALUES ($1, $2) RETURNING *", [speciesId, name])
        res.status(200)
        res.json({
            payload: species,
            message: `Success. Inserted animal ${name} into animals table.`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// PATCH /animals/:id: Update single animal.
router.patch('/:id', async (req, res) => {
        let id = req.params.id
        let name = req.body.name
        let speciesId = req.body.speciesId
        try {
            let animal = await db.any("UPDATE animals SET species_id = $1, nickname = $2 WHERE id = $3 RETURNING *", [speciesId, name, id]) 
            res.status(200)
            res.json({
                payload: animal,
                message: `Success. Updated ${name} in animals table.`
            });
        } catch (error) {
            res.status(500)
            res.json({
                message: "Error. Something went wrong!"
            })
            console.log(error)
        }

})


// DELETE /animals/:id: Delete single animal.
router.delete('/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let animal = await db.any("DELETE FROM animals WHERE id = $1 RETURNING *", [id])
        res.status(200)
        res.json({
            payload: animal,
            message: `Success. Deleted animal with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
    console.log(error)
 }
})


module.exports = router; 

