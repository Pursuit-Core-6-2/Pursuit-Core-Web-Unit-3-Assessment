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
router.get('/:species_id', async (req, res) => {
    let speciesId = req.params.species_id;
    try {
        let sightings = await db.any('SELECT * FROM sightings WHERE species_id = $1', speciesId);
        res.json({
            status: 'Success',
            message: 'Sightings by species retrieved',
            payload: sightings
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load sighting by species.',
            payload: null,
        });
    }
});

module.exports = router;