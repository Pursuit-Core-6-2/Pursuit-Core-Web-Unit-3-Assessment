const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/all', async (req, res) => {
    try {
        let animals = await db.any('SELECT * FROM animals')
        res.json({
            status: "success",
            message: "retrieved all animals", 
            payload: animals

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "animals not found",
            payload: null
        })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
try {
    let singleAnimal = 'SELECT * FROM animals WHERE id = $1'
    let result = await db.any(singleAnimal, [id])
    res.json({
        status: "success",
        message: "retrieved single animal", 
        payload: result

    })
} catch (error) {
    console.log(error)
    res.json({
        status: "error",
        message: "single animal not found",
        payload: null
    })
}
})


router.post('/register', async(req, res) => {
    try {
        let insertAnimal = `INSERT INTO animals (species_id, nickname)
        VALUES($1, $2)`

        await db.none(insertAnimals, [species_id, req.body.nickname])
        
        res.json({
            status: "success",
            message: "added animal",
            payload: req.body
            
        })
    }catch (error){
        res.json({
            status: "error",
            message: "animal not added",
            payload: null
        })
    }
})

router.delete('/delete', async (req, res)=>{
    let animal_id = req.body.id;
    
    let deleteQUERY = await db.none(`DELETE FROM animals WHERE id = $1`, [animal_id]);
    try{
        let deleteResearcher = ([animal_id])
        res.json(
            {
                status: "success",  
                message: "researcher removed",
                payload: deleteResearher
            })
        }
    catch (error ){
        message: "Was unable to Delete researcher!"
    }
    })



module.exports = router;