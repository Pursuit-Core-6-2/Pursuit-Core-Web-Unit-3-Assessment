//routing
const express = require('express');
const router = express.Router();
const db = require("../Database/database")


//get all sightings
router.get('/', async (req,res)=>{
    await db.any(`SELECT * FROM sightings
    JOIN researchers ON researchers.id = sightings.researcher_id
    JOIN species ON species.id = sightings.species_id
    JOIN habitats ON habitats.id = sightings.habitat_id`)
    .then(function(data){
        const response = {
            sightings: data
        }
        res.json({
            payload: response,
            message: "get all sightings"
        })
    }).catch(function(error){
        console.log(error)
        
        res.status(404);
        res.json({
            message: "An Error occured" + error,
        })
    })
})

//get /sightings/species/:id get all sightings of a specific species
router.get("/species/:id", async (req, res)=>{
    await db.any("SELECT * FROM sightings WHERE species_id = $1",[req.params.id])
    .then(function(data){
        const response = {
            sightings: data
        }
        res.json({
            payload: response,
            message: "success"
        })
    }).catch(function(err){
        res.json({
            message:"error" + err
        })
    })
})

//get /sightings/researcher/:id get all sightings of a specific researcher
router.get("/researcher/:id", async (req, res)=>{
    await db.any(`SELECT * FROM sightings 
    JOIN researchers on researchers.id = sightings.researcher_id
    JOIN species on species.id = sightings.species_id
    JOIN habitats on habitats.id = sightings.habitat_id 
    WHERE researcher_id = $1`,[req.params.id])
    .then(function(data){
        const response = {
            sightings: data
        }
        res.json({
            payload: response,
            message: "success"
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            message:"error" + err
        })

    })
    
})

//get /sightings/habitats/:id get all sightings of a specific researcher
router.get("/habitats/:id", async (req, res)=>{
    await db.any(`SELECT * FROM sightings 
    WHERE habitat_id = $1`,[req.params.id])
    .then(function(data){
        const response = {
            sightings: data
        }
        res.json({
            payload: response,
            message: "success"
        })
    }).catch(function(err){
        res.json({
            message:"error" + err
        })
    })
})

router.post('/', async (req,res)=>{
    let insert = `
    INSERT INTO sightings(researcher_id,species_id,habitat_id)
    VALUES($1,$2,$3)`

    try{
        await db.none(insert,[req.body.researcher_id,req.body.species_id,req.body.habitat_id])
        res.json({
            payload: req.body,
            message:"Post recieved"
        })
    }catch(err){
        res.status(500).json({
            message: "you msessed up"
        })
    }
})


router.delete('/:id', async( req, res) =>{
    let id = req.body.id;

    try{
        let queryDelete = `DELETE FROM sightings WHERE id = $1`;
        await db.none(queryDelete, [id])

        res.json({
            status: 'Delete successful',
            message: "sighting deleted"
        })
    }catch(err){
        console.log(err);
        res.json({
            status: `error`,
            message: `You messed up`
        })

    }
})


module.exports = router;