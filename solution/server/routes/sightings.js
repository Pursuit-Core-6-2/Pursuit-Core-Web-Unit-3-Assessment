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
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let sighting = await db.one('SELECT * FROM sightings WHERE id = $1', id);
        res.json({
            status: 'Success',
            message: 'Sighting retrieved',
            payload: sighting
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load sighting.',
            payload: null,
        });
    }
});
module.exports = router;