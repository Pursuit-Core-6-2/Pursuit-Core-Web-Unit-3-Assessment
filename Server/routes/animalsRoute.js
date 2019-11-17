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


module.exports = router;