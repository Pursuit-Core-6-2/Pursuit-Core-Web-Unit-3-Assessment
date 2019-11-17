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

module.exports = router;