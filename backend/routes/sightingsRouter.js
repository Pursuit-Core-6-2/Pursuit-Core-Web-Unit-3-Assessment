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

router.get('/species/:id', async(req, res)=> {
    let id = req.params.id
    let sightingsQuery = `SELECT sightings.id sightings, 
          species.name species 
          FROM sightings 
          INNER JOIN species ON sightings.species_id = species.id 
          WHERE sightings.id = ${id}`
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


module.exports = router;