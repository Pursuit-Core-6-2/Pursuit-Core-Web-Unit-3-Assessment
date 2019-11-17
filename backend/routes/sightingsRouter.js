const express = require('express');
const router = express.Router();
const db = require ('../database.js')


router.get('/all' , async(req, res) =>{
    try {
    let allSightings = await db.any(`SELECT * FROM sightings`)
    res.json({
        status: "success",
        message: "all sightings have been retrived",
        payload: {allSightings}
    });
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

module.exports = router;