const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all sightings
router.get('/', async (req, res) => {
    console.log('Sightings endpoint reached/ ', Date())
    try {
        let sightings = await db.any (`
        SELECT 
            species.name, species.is_mammal, sightings.researcher_id
        FROM species
        INNER JOIN sightings ON  sightings.species_id = species.id
        `
            // `
            // SELECT
            //     *
            // FROM
            //     sightings
            // `
            )
        res.json({
                status: "success",                      
                message: "retrieved all sightings", 
                payload: sightings
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "Sightings not found",
            payload: null
        })
    }
})

//get all sightings of certain species
router.get('/species/:species_id', async (req, res) => {
    console.log('Sightings species endpoint reached/ ', Date())
    try {
        let speciesSightings = await db.any (`
        SELECT 
           species.name, species.is_mammal, sightings.researcher_id
        FROM species
        INNER JOIN sightings ON  sightings.species_id = species.id
        WHERE species.id = '${req.params.species_id}'
        `)
        res.json({
                status: "success",                      
                message: "retrieved all sightings", 
                payload: speciesSightings
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "Sightings not found",
            payload: null
        })
    }
})

//get all sightings of certain researcher
router.get('/researchers/:researcher_id', async (req, res) => {
    console.log('Sightings species endpoint reached/ ', Date())
    try {
        let researcherSightings = await db.any (`
        SELECT 
            researchers.name, sightings.species_id, sightings.habitats_id
        FROM researchers
        INNER JOIN sightings ON  sightings.researcher_id = researchers.id
        WHERE researchers.id = ${req.params.researcher_id}
        `)
        res.json({
                status: "success",                      
                message: "retrieved all researchers sightings", 
                payload: researcherSightings
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "Sightings not found",
            payload: null
        })
    }
})

//get all sightings of certain researcher
router.get('/habitats/:habitat_id', async (req, res) => {
    console.log('Sightings species endpoint reached/ ', Date())
    try {
        let habitatSightings = await db.any (`
        SELECT 
            habitats.category, sightings.species_id, sightings.habitats_id
        FROM habitats
        INNER JOIN sightings ON  sightings.habitats_id = habitats.id
        WHERE habitats.id = ${req.params.habitat_id}
        `)
        res.json({
                status: "success",                      
                message: "retrieved all habitat sightings from one type", 
                payload: habitatSightings
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "Sightings not found",
            payload: null
        })
    }
})

//Report new sighting
router.post('/', async (req, res) => {
    let addNewSighting =
    `INSERT INTO sightings(researcher_id, species_id, habitats_id)
        VALUES($1, $2, $3)`
    
    try {
        await db.none(addNewSighting, [req.body.researcher_id, req.body.species_id, req.body.habitats_id])
        console.log(req.body.researcher_id, req.body.species_id, req.body.habitats_id)
        res.json({
            status: "success",
            message: "Made a new sighting",
            payload: req.body
        })
    } catch(error) {
        res.status(404)
        console.log(error);
        res.json({
            status: "error",
            message: "Could not create a new sighting",
            payload: null
        })
    }
})

//Delete a sighting
router.delete('/:sighting_id', async (req, res) => {
    let sightingDelete =
    `DELETE FROM sightings WHERE id = '${req.params.sighting_id}'`
    
    let sightingRecord = await db.one (
        `SELECT
            *
        FROM
            sightings
        WHERE id = ${req.params.sighting_id}`)

    console.log(sightingRecord)

    try {
        await db.none(sightingDelete)
        res.json({
            status: "success",
            message: "Sighting deleted",
            payload: sightingRecord
        })
    } catch(error) {
        res.status(404)
        res.json({
            status: "error",
            message: 'Could not delete sighting',
            payload: null
        })
    }
})


module.exports = router;