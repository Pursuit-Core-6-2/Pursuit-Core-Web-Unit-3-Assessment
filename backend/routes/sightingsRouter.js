const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')
/////////////////////////////////////////

//ROUTE TO GET ALL SIGHTINGS 
router.get('/', async(req, res) => {
    try {
        const requestQuery = ` SELECT * FROM sightings`;

        let allSightings = await db.any(requestQuery)
        res.status(200)
        res.json({
            data: allSightings,
            status: 'success',
            message: `Results has been successfully delivered`
        })

    } catch (error) {
        res.status(400)
        res.json({
            
            message: 'Something went wrong'
        })

    }
})
////////////////////////////////////////////////////////

//ROUTE TO GET ALL THE SIGHTINGS OF A SPECIFIC SPECIES
router.get('/researchers/:id', async(req, res) => {
    const sightingsId = req.params.researcher_id
    
    try {
        const requestQuery = `SELECT sightings.id, researchers.id FROM sightings INNER JOIN researchers ON sightings.researcher_id = researchers.id AND sightings.id = $1`;

        let sightingsById = await db.one(requestQuery, [sightingsId]) 
        res.status(200) 
        res.json({
            data: sightingsById,
            status: 'success',
            message: `The data was successfully retrieved`
        })

    } catch (error) {
        res.status(400)
        res.json({
            message: `Failed to retrieve the data`
        })
    }
})


////////////////////////////////////////////
//ROUTE TO ADD A NEW SIGTHING TO THE DATABASE
router.post('/', async(req, res) => {
   
   try {
       const insertQuery = `INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES($1, $2, $3)`
       await db.none(insertQuery, [req.body])
        console.log('researcher_id', req.body.researcher_id)
    //console.log(db)
        let data = {
         researcher_id: req.body.researcher_id,
             species_id: req.body.species_id,
             habitat_id: req.body.habitat_id,
            
    }
    res.json({
        payload: data,
      message: 'Successfully posted'
    })
    } catch (error) {
        console.log('error')

   }
})

// router.get('/', () )

module.exports = router;