//routing
const express = require('express');
const router = express.Router();
const db = require("../Database/database")

//todo
//get /habitats get all habitats
//get /habitats/:id get single habitat
//post /habitats add new habitat


//get all species
router.get("/", async (req,res)=>{
    await db.any("SELECT * FROM habitats")
    .then(function(data){
        const response = {
            habitats: data
        }
        // res.send(response)
        res.json({
            payload: response,
            message: "get all habitats"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})


//get one habitat
router.get("/:id", async (req,res)=>{
   await db.one(`SELECT category FROM habitats Where id = $1`,req.params.id)
    .then(function(data){
        const response = {
            habitats: data
        }
        
        res.json({
            payload: response,
            message: "get one habitat"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})

//post one  habitat
router.post('/', async (req,res)=>{
    let insert = `
    INSERT INTO habitats(category)
    VALUES ($1)`

    try{
        await db.none(insert,[req.body.category])
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