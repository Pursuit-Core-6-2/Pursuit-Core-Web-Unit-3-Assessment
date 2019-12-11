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

//ROUTE TO GET ALL THR SIGHTINGS OF A SPECIFIC SPECIES
router.get('/species/:id', async (req, res) => {
    const sightingsId = req.params.id
        console.log('id', sightingsId)

    try {
        const requestQuery = `SELECT sightings.id, species_id, researcher_id, habitat_id FROM sightings INNER JOIN species ON sightings.species_id = species.id WHERE species_id= $1`;

        let sightingsById = await db.any(requestQuery, [sightingsId])
        res.status(200)
        res.json({
            data: sightingsById,
            status: 'success',
            message: `The sighting was successfully retrieved`
        })

    } catch (error) {
        res.status(400)
        res.json({
            message: `Failed to retrieve the sighting`
        })
    }
})
////////////////////////////////////////////////////////////

//ROUTE TO GET ALL THE SIGHTINGS OF A SPECIFIC RESEARCHER
router.get('/researchers/:id', async(req, res) => {
    const sightingsId = req.params.id
    
    try {
        const requestQuery = `SELECT sightings.id, species_id, researcher_id, habitat_id FROM sightings INNER JOIN researchers ON sightings.researcher_id = researchers.id WHERE researcher_id= $1`;

        let sightingsById = await db.any(requestQuery, [sightingsId]) 
        console.log('sightings', sightingsById)
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
////////////////////////////////////////////////////

//ROUTE TO GET ALL THE SIGHTINGS FOR A SPECIFIC HABITAT
router.get('/habitats/:id', async(req, res) => {
     const sightingsId = req.params.id

     try {
         const requestQuery = `SELECT sightings.id, species_id, researcher_id, habitat_id FROM sightings INNER JOIN habitats ON sightings.habitat_id = habitats.id WHERE habitat_id= $1`;

         let sightingsById = await db.any(requestQuery, [sightingsId])
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
       const insertQuery = `INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES($1, $2, $3)`;
      
      
        
       await db.none(insertQuery, [req.body.researcher_id, req.body.species_id, req.body.habitat_id])
       
        //console.log('hey', req.body.habitat_id)
        let data = {
            researcher_id: req.body.researcher_id,
            species_id: req.body.species_id,
            habitat_id: req.body.habitat_id
        }
        res.status(201)
        res.json({
       data: data,
        status: 'success',
        message: 'Successfully posted'
        })
          console.log('data', data)
    } catch (error) {
        res.status(400)
        res.json({
            message: `The information could not be added`
        })
   }
})

router.delete('/:id', async (req, res) => {
    const sightingsId = req.params.id
    try {
        const deleteQuery = ` DELETE FROM sightings WHERE id=$1`;

        let sightingsById = await db.any(deleteQuery, [sightingsId])
        res.status(200)
        res.json({
           
            status: 'success',
            message: `data has been successfully deleted`
        })

    } catch (error) {
        res.status(400)
        res.json({
            message: 'Something went wrong could not delete'
        })

    }
})

 



module.exports = router;