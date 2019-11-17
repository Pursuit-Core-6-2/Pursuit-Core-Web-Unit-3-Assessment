const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all researchers
router.get('/', async (req, res) => {
    console.log('Species endpoint reached/ ', Date())
    try {
        let species = await db.any (`
            SELECT
                *
            FROM
                species
        `)
        res.json({
                status: "success",                      
                message: "retrieved all species", 
                payload: species
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "species not found",
            payload: null
        })
    }
})

module.exports = router;