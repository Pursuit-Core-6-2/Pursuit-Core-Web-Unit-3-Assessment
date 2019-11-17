const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all sightings
router.get('/', async (req, res) => {
    console.log('Sightings endpoint reached/ ', Date())
    try {
        let sightings = await db.any (`
            SELECT
                *
            FROM
                sightings
        `)
        res.json({
                status: "success",                      
                message: "retrieved all sightings", 
                payload: sightings
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "Sightings not found",
            payload: null
        })
    }
})

module.exports = router;