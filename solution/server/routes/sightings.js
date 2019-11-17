const express = require('express');
const router = express.Router();
const db = require('./pgp.js')

router.get('/', async (req, res) => {
    try {
        let sightings = await db.any('SELECT * FROM sightings');
        res.json({
            status: 'Success',
            message: 'Retrieved all sightings',
            payload: sightings,
        })
    }
    catch (error){
        res.json({
            status: 'Error',
            message: 'Could not load sightings.',
            payload: null,
        });
    }
});

module.exports = router;