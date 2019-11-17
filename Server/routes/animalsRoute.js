const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all animals
router.get('/', async (req, res) => {
    console.log('Species endpoint reached/ ', Date())
    try {
        let animals = await db.any (`
            SELECT
                *
            FROM
                animals
        `)
        res.json({
                status: "success",                      
                message: "retrieved all animals", 
                payload: animals
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "animals not found",
            payload: null
        })
    }
})

//Get animal by ID
router.get('/:animal_id', async (req, res) => {
    let findStaff = `
        SELECT *
        FROM animals
        WHERE id = $1
    `
    console.log('Species single endpoint reached/ ', Date())

    try {
        let animal = await db.one(findStaff, [req.params.animal_id])
        res.json({
            status: "success",
            message: "retrieved single animal",
            payload: animal
        })
    } catch (error) {
        res.status(500)
        // console.log(error)
        res.json({
            status: "error",
            message: "Animal not found",
            payload: null
        })
    }
})

//create new animal info
router.post('/', async (req, res) => {
    let addNewAnimal =
    `INSERT INTO animals(species_id, nickname)
        VALUES($1, $2)`
    
    try {
        await db.none(addNewAnimal, [req.body.species_id, req.body.nickname])
        res.json({
            status: "success",
            message: "Added new animal",
            payload: req.body
        })
    } catch(error) {
        res.status(404)
        res.json({
            status: "error",
            message: "Could not add animal",
            payload: null
        })
    }
})

//update an existing animal
router.patch('/:animal_id', async (req, res) => {
    let updateInfo = ''
    for(key in req.body) {
        let set = `${key} = '${req.body[key]}'`
        updateInfo += set + ','
    }

    updateInfo = updateInfo.slice(0, updateInfo.length - 1)
    console.log(updateInfo)

    let updateAnimal = 
    `
        UPDATE animals
        SET ${updateInfo}
        WHERE id = '${req.params.animal_id}'
    `
    try {
        await db.none(updateAnimal)
        res.json({
            status: "success",
            message: "Animal updated",
            payload: req.body
        })
    } catch(error) {
        console.log(error)
        res.status(404)
        res.json({
            status: "error",
            message: "Could not update animal",
            payload: null
        })
    }
})

//Delete a Animal
router.delete('/:animal_id', async (req, res) => {
    let animalDelete =
    `DELETE FROM animals WHERE id = '${req.params.animal_id}'`
    
    let targetAnimal = await db.one (
        `SELECT
            *
        FROM
            animals
        WHERE id = ${req.params.animal_id}`)

    console.log(targetAnimal)

    try {
        await db.none(animalDelete)
        res.json({
            status: "success",
            message: "Animal deleted",
            payload: targetAnimal
        })
    } catch(error) {
        res.status(404)
        res.json({
            status: "error",
            message: 'Could not delete animal',
            payload: null
        })
    }
})

module.exports = router;