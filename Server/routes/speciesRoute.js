const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all species
router.get('/', async (req, res) => {
    console.log('Species endpoint reached/ ', Date())
    try {
        let species = await db.any (`
            SELECT
                *
            FROM
                species
        `)
        res.json({
                status: "success",                      
                message: "retrieved all species", 
                payload: species
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "species not found",
            payload: null
        })
    }
})

//Get species by ID
router.get('/:species_id', async (req, res) => {
    let findStaff = `
        SELECT *
        FROM species
        WHERE id = $1
    `
    console.log('Species single endpoint reached/ ', Date())

    try {
        let species = await db.one(findStaff, [req.params.species_id])
        res.json({
            status: "success",
            message: "retrieved single species",
            payload: species
        })
    } catch (error) {
        res.status(500)
        console.log(error)
        res.json({
            status: "error",
            message: "species not found",
            payload: null
        })
    }
})

//Log a new species
router.post('/', async (req, res) => {
    let addNewStaff =
    `INSERT INTO species(name, is_mammal)
        VALUES($1, $2)`
    
    try {
        await db.none(addNewStaff, [req.body.name, req.body.is_mammal])
        res.json({
            status: "success",
            message: "Logged a new species",
            payload: req.body
        })
    } catch(error) {
        res.status(404)
        res.json({
            status: "error",
            message: "Could not log that species",
            payload: null
        })
    }
})

module.exports = router;