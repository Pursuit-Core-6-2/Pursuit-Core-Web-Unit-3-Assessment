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

//post a new animal
router.post('/', async (req, res)=>{
    let insertQuery =  `INSERT INTO animals(species_id, nickname)
    VALUES($1, $2);`

    let species_id = req.body.species_id
    let nickname = req.body.nickname

    let body = {
        species_id : species_id,
        nickname: nickname
    }

    try{
        await db.none(insertQuery,[species_id, nickname])
        res.json({
            status : 'success',  
            message: 'Animal has been added',
            payload: body
        })
    } catch (error) {
        res.json({
            status: "error",
            message: null
        })
    }
})

router.patch('/:id', async (req, res) =>{
    let id = Number(req.params.id)
    let species_id = req.body.species_id
    let nickname = req.body.nickname
    let updateQuery = `UPDATE animals 
    SET nickname = $1 , species_id = $2
    WHERE id = $3 ;`

    let updatedAnimal = {
        species_id:species_id,
        nickname:nickname
    }

    try{
        await db.any(updateQuery, [species_id, nickname, id])
        res.json({
            status: 'Success',
            message: 'Animal has been updated',
            payload: updatedAnimal
        })
    } catch (error) {
        res.json({
            status: "error",
            message: "unable to update animal", 
            payload: null
        })
    }
})

//deletes animal
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deletedAnimal = await db.none(`DELETE FROM animals WHERE id = ${id}`)
        res.json({
            status: "Success",
            message: `Animal ${id} was deleted`,
            payload: deletedAnimal
        })
    } catch (error){
        res.json({
            status: 'error',
            message: null
        })
    }
})

module.exports = router; 