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
router.get('/species/:id', async (req, res) => {
    let speciesId = Number(req.params.id);
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
router.get('/researchers/:id', async (req, res) => {
    let researcherId = Number(req.params.id);
    try {
        let sightings = await db.any('SELECT * FROM sightings WHERE researcher_id = $1', researcherId);
        res.json({
            status: 'Success',
            message: 'Sightings by researcher retrieved',
            payload: sightings
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load sighting by researcher.',
            payload: null,
        });
    }
});
router.get('/habitats/:id', async (req, res) => {
    let habitatId = Number(req.params.id);
    try {
        let sightings = await db.any('SELECT * FROM sightings WHERE habitat_id = $1', habitatId);
        res.json({
            status: 'Success',
            message: 'Sightings by habitat retrieved',
            payload: sightings
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load sighting by habitat.',
            payload: null,
        });
    }
});
module.exports = router;