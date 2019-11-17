const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all habitats
router.get('/', async (req, res) => {
    console.log('Habitats endpoint reached/ ', Date())
    try {
        let habitats = await db.any (`
            SELECT
                *
            FROM
                habitats
        `)
        res.json({
                status: "success",                      
                message: "retrieved all habitats", 
                payload: habitats
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "habitats not found",
            payload: null
        })
    }
})

//Get habitats by ID
router.get('/:habitat_id', async (req, res) => {
    let findHabitat = `
        SELECT *
        FROM habitats
        WHERE id = $1
    `
    console.log('Researchers single endpoint reached/ ', Date())

    try {
        let habitat = await db.one(findHabitat, [req.params.habitat_id])
        res.json({
            status: "success",
            message: "retrieved single habitat",
            payload: habitat
        })
    } catch (error) {
        res.status(500)
        console.log(error)
        res.json({
            status: "error",
            message: "researcher not found",
            payload: null
        })
    }
})

//create a new habitat
router.post('/', async (req, res) => {
    let addNewHabitat =
    `INSERT INTO habitats(category)
        VALUES($1)`
    
    try {
        await db.none(addNewHabitat, [req.body.category])
        res.json({
            status: "success",
            message: "Created a new habitat",
            payload: req.body
        })
    } catch(error) {
        res.status(404)
        res.json({
            status: "error",
            message: "Could not create new habitat",
            payload: null
        })
    }
})

module.exports = router;