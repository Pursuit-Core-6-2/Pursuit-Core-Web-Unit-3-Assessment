const express = require('express');

const router = express.Router();

const db = require('./database');


// GET /habitats: Get all habitats.
router.get('/', async (req, res) => {
    try {
        let habitats = await db.any("SELECT * FROM habitats")
        res.status(200)
        res.json({
            payload: habitats,
            message: "Success. Retrieved all the habitats."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// GET /habitats/:id: Get single habitat.
router.get('/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let habitat = await db.one("SELECT * FROM habitats WHERE id = $1", [id])
        res.status(200)
        res.json({
            payload: habitat,
            message: `Success. Retrieved habitat with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// POST /habitats: Add new habitat.
router.post('/', async (req, res) => {
    let category = req.body.category
    try {
        let habitat = await db.any("INSERT INTO habitats (category) VALUES ($1) RETURNING *", [category])
        res.status(200)
        res.json({
            payload: habitat,
            message: `Success. Inserted habitat: ${category} into habitats table.`
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