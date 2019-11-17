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

module.exports = router;