const express = require('express')
const router = express.Router()
const db = require('./db')

//Gets all sightings
router.get('', async (req,res) =>{ 
    try{
        const sightings = await db.any('select * from sightings');
        res.json({
            status : 'success',
            message : 'retrieved all sightings',
            payload : {
                sightings: sightings
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'sightings not found',
            payload: null
        })
    }
})

//Gets all sightings of a specific species.
router.get('/species/:id', async (req,res) =>{ 
    try{
        const species_id = req.params.id
        const sightings = await db.any(`select * from sightings where species_id = ${species_id}`);
        res.json({
            status : 'success',
            message : `retrieved all sightings for species with id ${species_id}`,
            payload : {
                sightings: sightings
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'sightings not found',
            payload: null
        })
    }
})

//Gets all sightings from a specific researcher.
router.get('/researchers/:id', async (req,res) =>{ 
    try{
        const researchers_id = req.params.id
        const sightings = await db.any(`select * from sightings where researcher_id = ${researchers_id}`);
        res.json({
            status : 'success',
            message : `retrieved all sightings for researcher with id ${researchers_id}`,
            payload : {
                sightings: sightings
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'sightings not found',
            payload: null
        })
    }
})

//Gets all sightings for a specific habitat.
router.get('/habitats/:id', async (req,res) =>{ 
    try{
        const habitat_id = req.params.id
        const sightings = await db.any(`select * from sightings where habitat_id = ${habitat_id}`);
        res.json({
            status : 'success',
            message : `retrieved all sightings for habitat with id ${habitat_id}`,
            payload : {
                sightings: sightings
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'sightings not found',
            payload: null
        })
    }
})

//Adds a new sighting 
router.post('', async (req,res) =>{ 
    try{
        const species_id = Number(req.body.species_id)
        const researcher_id = Number(req.body.researcher_id)
        const habitat_id = Number(req.body.habitat_id)
        
        const insert_query = 
        `INSERT into sightings(species_id, researcher_id, habitat_id) VALUES
        ($1, $2, $3)`

        if(!species_id && !researcher_id && !habitat_id){
            res.json({
                status : 'error',
                message: "information missing"
            })
        }else{
            await db.none(insert_query, [species_id, researcher_id, habitat_id]);  
            res.json({
                status : 'success',
                message : `added sighting`,
            }) 
        }
    }catch(err){
        console.log(err);
        res.json({
            status : 'error',
            message: `sighting not added`,
        })
    }
})

//Deletes a sighting
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await db.none(`delete from sightings where id = ${id}`);
        
        res.json({
            status: "success",
            message: "deleted sighting",
        })
    }catch (error) {        
        res.json({
            status : 'error',
            message: 'could not delete sighting'
        })
    }
})

//Export
module.exports = router