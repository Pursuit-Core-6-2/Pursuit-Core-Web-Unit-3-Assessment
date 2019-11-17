const express = require('express');
const router = express.Router();
const db = require('../db')

// POST /sightings: Add new sighting.
// DELETE /sightings/:id: Delete single sighting.

router.get('/all', async (req, res) => {

    try {
        let sightings = await db.any('SELECT * FROM sightings')
        res.json({
            status: "success",
            message: "retrieved all sightings", 
            payload: sightings

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "researchers not found",
            payload: null
        })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
try {
    let singlesightings = 'SELECT * FROM sightings WHERE id = $1'
    let result = await db.any(singlesightings, [id])
    res.json({
        status: "success",
        message: "retrieved single sightings", 
        payload: result

    })
} catch (error) {
    console.log(error)
    res.json({
        status: "error",
        message: "single sightings not found",
        payload: null
    })
}
})

router.get('/researcher/:id', async (req, res) => {
    let researcherID = req.params.researcher_id
try {
    let sightingsForResearcher= 'SELECT * FROM sightings WHERE researcher_id = $1'
    let result = await db.any(sightingsForResearcher, [researcherID])
    res.json({
        status: "success",
        message: "retrieved single sightings from researcher", 
        payload: result

    })
} catch (error) {
    console.log(error)
    res.json({
        status: "error",
        message: "single sightings from researcher not found",
        payload: null
    })
}
})


router.get('/habitats/:id', async (req, res) => {
    let habitatID = req.params.habitat_id
try {
    let sightingsForHabitiat= 'SELECT * FROM sightings WHERE habitat_id = $1'
    let result = await db.any(sightingsForHabitiat, [habitatID])
    res.json({
        status: "success",
        message: "retrieved single sightings from habitat", 
        payload: result

    })
} catch (error) {
    console.log(error)
    res.json({
        status: "error",
        message: "single sightings from researcher not found",
        payload: null
    })
}
})

router.post('/register', async(req, res) => {
    try {
        let insertSightings = `INSERT INTO sightings (reseacher_id, species_id, habitat_id)
        VALUES($1, $2, $3)`

        await db.none(insertSightings, [req.body.reseacher_id, req.body.species_id, req.body.habitat_id])
        
        res.json({
            status: "success",
            message: "added sightings",
            payload: req.body
            
        })
    }catch (error){
        res.json({
            status: "error",
            message: "sightings not added",
            payload: null
        })
    }
})

router.delete('/delete', async (req, res)=>{
    let sightingsID = req.body.id;
    
    let deleteQUERY = await db.none(`DELETE FROM sightings WHERE id = $1`, [sightingsID]);
    try{
        let deleteSighting = ([sightingsID])
        res.json(
            {
                status: "success",
                message: "sighting removed",
                payload: deleteSighting
            })
        }
    catch (error){
        message: "Was unable to Delete Sighting!"
    }
    })


module.exports = router;