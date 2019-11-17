//routing
const express = require('express');
const router = express.Router();
const db = require("../Database/database")

//todo
//get /species  get all species
//get /species/:id get single species
//post /species add new species


//get all species
router.get("/", async (req,res)=>{
    await db.any("SELECT * FROM species")
    .then(function(data){
        const response = {
            species: data
        }
        // res.send(response)
        res.json({
            payload: response,
            message: "get all species"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})


//get one species
router.get("/:id", async (req,res)=>{
   await db.one(`SELECT name, is_mammal FROM species Where id = $1`,req.params.id)
    .then(function(data){
        const response = {
            species: data
        }
        
        res.json({
            payload: response,
            message: "get one species"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})

//post one species
router.post('/', async (req,res)=>{
    let insert = `
    INSERT INTO species(name,is_mammal)
    VALUES ($1,$2)`

    try{
        await db.none(insert,[req.body.name,req.body.is_mammal])
        res.json({
            payload: req.body,
            message:"Post recieved"
        })
    }catch(error){
        res.status(500)
        res.json({
            message: "you messed up"
        })
    }
})


module.exports = router;