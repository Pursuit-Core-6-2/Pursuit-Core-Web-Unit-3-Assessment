const express = require('express');
const router = express.Router();
const db = require ('../database.js')


router.get('/all' , async(req, res) =>{
    try {
    let allSightings = await db.any(`SELECT * FROM sightings`)
    res.json({
        status: "success",
        message: "all sightings have been retrived",
        payload: {allSightings}
    });
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

// this is broken
router.get('/species/:id', async(req, res)=> {
    let id = req.params.id
    let sightingsQuery = `SELECT sightings.id sightings, 
          species.name species 
          FROM sightings 
          INNER JOIN species ON sightings.species_id = species.id 
          WHERE sightings.id = ${id};`
    try {
       let getSightings = await db.one(sightingsQuery)
       console.log(getSightings)
        res.json({
            status: 'success', 
            message: 'sightings have been retrieved by species',
            payload : getSightings
        })
    } catch(error) {
        res.json({
            status:'error',
            message : error
        })
    }
})

//trying to get the researcher sightings
router.get('/researchers/:id', async(req, res) =>{
    let id = req.params.id
    let researcherSightingQuery =`SELECT sightings.id sighting, 
    researches.name researchers FROM sightings 
    INNER JOIN researchers ON sightings.researcher_id = researchers.id 
    WHERE sightings.id = ${id};`

    try{
        let researchSighting = await db.one(researcherSightingQuery)
        console.log(researchSighting)
    }catch (error) {
        res.json({
            status: 'error',
            message: error
        })
    }
})

//trying to get habitat
router.get('/habitat/:id', async (req, res) =>{
    let id = req.params.id
    let habitatQuery = `SELECT sightings.id sighting, habitats.name habitats
    FROM sightings INNER JOIN habitats ON sighting.habitat_id = habitats.id
    WHERE sightings.id = ${id}`
    
    try{
        let habitatSighting = await db.one(habitatQuery)
        console.log(habitatQuery)
    } catch (error) {
        res.json({
            status: 'error',
            message: error
        })
    }
})

router.post('/sightings', async(req,res) =>{
    let insertQuery =  `INSERT INTO sightings(researcher_id, species_id, habitat_id)
    VALUES($1, $2, $3);`

    let researcher_id = req.body.researcher_id
    let species_id = req.body.species_id
    let habitat_id = req.body.habitat_id

    let body = {
        researcher_id: researcher_id,
        species_id: species_id,
        habitat_id: habitat_id
    }

    try {
        await db.one(insertQuery [researcher_id, species_id, habitat_id])
        res.json({
            status: 'success',
            message: 'New sighting has been added',
            payload: body
        })
    }catch (error){
        res.json({
            status: 'error',
            message: null
        })
    }
})

module.exports = router;