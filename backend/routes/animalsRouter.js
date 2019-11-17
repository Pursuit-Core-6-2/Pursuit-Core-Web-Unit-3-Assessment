const express = require('express');
const router = express.Router();
const db = require ('../database.js')

// get all animals
router.get('/all' , async(req, res) =>{
    try {
    let allAnimals = await db.any(`SELECT * FROM animals`)
    res.json({
        status: "success",
        message: "all animals have been retrived",
        payload: {allAnimals}
    });
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

//get single animal
router.get('/:id', async(req, res)=>{
    let id = Number(req.params.id)
    try {
        let animal = await db.one(`SELECT * FROM animals WHERE id = ${id}`)
        res.json({
            status: "success",
            message : `single animal has been retrieved.`,
            payload : animal
            
        })
    } catch (error) {
        res.json({
            status: "error",
            message: "animal not found.",
            payload: null
        })
    }
})


module.exports = router; 