const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

router.get('/', async (req, res) => {
    console.log('Researchers endpoint reached/ ', Date())
    try {
        let researchers = await db.any (`
            SELECT
                *
            FROM
                researchers
        `)
        res.json({
                status: "success",                      
                message: "retrieved single researcher", 
                payload: researchers
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "researcher not found",
            payload: null
        })
    }
})

module.exports = router;