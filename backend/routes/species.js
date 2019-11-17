const express = require('express');
const router = express.Router();
const db = require('../db');



router.get('/all', async (req, res) => {
    try {
        let species = await db.any('SELECT * FROM species')
        res.json({
            status: "success",
            message: "retrieved all species", 
            payload: species

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "species not found",
            payload: null
        })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
try {
    let singleSpecies = 'SELECT * FROM species WHERE id = $1'
    let result = await db.any(singleSpecies, [id])
    res.json({
        status: "success",
        message: "retrieved single species", 
        payload: result

    })
} catch (error) {
    console.log(error)
    res.json({
        status: "error",
        message: "single species not found",
        payload: null
    })
}
})


router.post('/register', async(req, res) => {
    try {
        let insertSpecies = `INSERT INTO species (species_name, is_mammal)
        VALUES($1, $2)`

        await db.none(insertSpecies, [species_name, req.body.is_mammal])
        
        res.json({
            status: "success",
            message: "added species",
            payload: req.body
            
        })
    }catch (error){
        res.json({
            status: "error",
            message: "species not added",
            payload: null
        })
    }
})


module.exports = router;