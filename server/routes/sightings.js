const express = require('express');

const router = express.Router();

const db = require('./database');


// GET /sightings: Get all sightings.
router.get('/', async (req, res) => {
    try {
        let sightings = await db.any("SELECT * FROM sightings")
        res.status(200)
        res.json({
            payload: sightings,
            message: "Success. Retrieved all the sightings."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// GET /sightings/species/:id: Get all sightings of a specific species.
router.get('/species/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let sightings = await db.any("SELECT * FROM sightings WHERE species_id = $1", [id])
        res.status(200)
        res.json({
            payload: sightings,
            message: `Success. Retrieved all sightings for species with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// GET /sightings/researchers/:id: Get all sightings for a specific researcher.
router.get('/researchers/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let sightings = await db.any("SELECT * FROM sightings WHERE researcher_id = $1", [id])
        res.status(200)
        res.json({
            payload: sightings,
            message: `Success. Retrieved all sightings for researcher with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})



// GET /sightings/habitats/:id: Get all sightings for a specific habitat.
router.get('/habitats/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let sightings = await db.any("SELECT * FROM sightings WHERE habitat_id = $1", [id])
        res.status(200)
        res.json({
            payload: sightings,
            message: `Success. Retrieved all sightings for habitat with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// POST /sightings: Add new sighting.
router.post('/', async (req, res) => {
    let researcherId = req.body.researcherId
    let speciesId = req.body.speciesId
    let habitatId = req.body.habitatId
    try {
        let sighting = await db.any("INSERT INTO sightings (researcher_id, species_id, habitat_id) VALUES ($1, $2, $3) RETURNING *", [researcherId, speciesId, habitatId])
        res.status(200)
        res.json({
            payload: sighting,
            message: `Success. Inserted sighting into sightings table.`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// DELETE /sightings/:id: Delete single sighting.
router.delete('/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let sighting = await db.any("DELETE FROM sightings WHERE id = $1 RETURNING *", [id])
        res.status(200)
        res.json({
            payload: sighting,
            message: `Success. Deleted sighting with id ${id}`
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