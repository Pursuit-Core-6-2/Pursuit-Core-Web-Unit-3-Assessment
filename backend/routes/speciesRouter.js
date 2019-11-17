const express = require('express');
const router = express.Router();
const db = require ('../database.js')

// get all species
router.get('/all' , async(req, res) =>{
    try {
    let allSpecies = await db.any(`SELECT * FROM species`)
    res.json({
        status: "success",
        message: "all species have been retrived",
        payload: {allSpecies}
    });
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

// get one species
router.get('/:id', async(req, res)=>{
    let id = Number(req.params.id)
    try {
        let species = await db.one(`SELECT * FROM species WHERE id = ${id}`)
        res.json({
            status: "success", 
            message: "retrieved single species",
            payload: species
        })
    } catch (error) {
        res.json({
            status: "error",
            message: "species not found",
            payload: null
        })
    }
})

//adding a new species
router.post('/', async (req, res)=>{
    let insertQuery =  `INSERT INTO species(name, is_mammal)
    VALUES($1, $2);`

    let name = req.body.name
    let is_mammal = req.body.is_mammal

    let body = {
        name : name,
        is_mammal: is_mammal
    }

    try{
        await db.none(insertQuery,[name, is_mammal])
        res.json({
            status : 'success',  
            message: 'Species has been added',
            payload: body
        })
    } catch (error) {
        res.json({
            status: "error",
            message: null
        })
    }
})

module.exports = router;