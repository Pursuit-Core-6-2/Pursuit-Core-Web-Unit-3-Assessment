//routing
const express = require('express');
const router = express.Router();
const db = require("../Database/database")


//get all sightings
router.get('/', async (req,res)=>{
    await db.any("SELECT * FROM sightings")
    .then(function(data){
        const response = {
            sightings: data
        }
        res.json({
            payload: response,
            message: "get all sightings"
        })
    }).catch(function(error){
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
    await db.any("SELECT * FROM sightings WHERE researcher_id = $1",[req.params.id])
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

//get /sightings/habitats/:id get all sightings of a specific researcher
router.get("/habitats/:id", async (req, res)=>{
    await db.any("SELECT * FROM sightings WHERE habitat_id = $1",[req.params.id])
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


module.exports = router;