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
router.post('/', async (req, res) => {
    let newSighting = req.body;
    try {
        let insertQuery = `INSERT INTO sightings(researcher_id, species_id, habitat_id)
            VALUES($1, $2, $3)`
        await db.none(insertQuery, [newSighting.researcher_id, newSighting.species_id, newSighting.habitat_id]);
        res.json({
            status: 'Success',
            message: "New sighting posted",
            payload: newSighting
        })
    }
    catch (error) {
        res.json({
            status: 'Error',
            message: 'Error posting new sighting',
            payload: null
        });
    }
});
router.delete('/:id', async (req, res) => {
    let sightingId = Number(req.params.id);
    try {
        let deleteQuery = `DELETE FROM sightings
                    WHERE id = $1`;
        await db.none(deleteQuery, sightingId);
        res.json({
            status: 'Success',
            message: 'Sighting was deleted from database'
        })
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Sighting could not be deleted',
            payload: null
        });
        };
});
module.exports = router;