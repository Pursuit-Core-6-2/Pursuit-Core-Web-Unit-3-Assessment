const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all sightings from database
router.get('/', async (request, response) => {
    console.log('currently running');

    try {
        let sightings = await db.any(`SELECT * FROM sightings`);

        response.json({
            status: 'success',
            message: 'Retrieved all of the sightings',
            payload: {
                sightings: sightings
            }
        })
    } catch (error) {
        console.log(error)
        response.json({
            status: 'error',
            message: 'Something went wrong. Could not retrieve all of the sighitngs',
            payload: null
        });
    }
});

// Get all sightings of a single species from database
router.get('/species/:id', async (request, response) => {
    console.log('currently running');
    let id = request.params.id;

    try {
        let sightingsQuery = `SELECT * FROM sightings WHERE species_id = $1`;
        let sightings = await db.any(sightingsQuery, [id]);

        response.json({
            status: 'success',
            message: 'Retrieved all sightings of selected species.',
            payload: {
                sightings: sightings
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'No sightings for selected species',
            payload: null
        });
    }
});

// Get all sightings done by a single researcher from database
router.get('/researchers/:id', async (request, response) => {
    console.log('currently running');
    let id = request.params.id;

    try {
        let researcherSightingQuery = `SELECT * FROM sightings WHERE researcher_id = $1`;
        let sightings = await db.any(researcherSightingQuery, [id]);

        response.json({
            status: 'success',
            message: 'Retrieved all sightings from selected researcher',
            payload: {
                sightings: sightings
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'No sightings from selected researcher',
            payload: null
        });
    }
});

// Get all sightings for a single habitat from database
router.get('/habitats/:id', async (request, response) => {
    console.log('currently running');
    let id = request.params.id;

    try {
        let habitatSightingQuery = `SELECT * FROM sightings WHERE species_id = $1`;
        let sightings = await db.any(habitatSightingQuery, [id]);

        response.json({
            status: 'success',
            message: 'Retrieved all sightings in selected habitat.',
            payload: {
                sightings: sightings
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'No sightings in selected habitat',
            payload: null
        });
    }
});

// Add a new sighting to database
router.post('/', async (request, response) => {
    console.log('currently running');
    let researcher_id = request.body.researcher_id;
    let species_id = request.body.species_id;
    let habitat_id = request.body.habitat_id;

    try {
        let sightingInfo = {
            researcher_id: researcher_id,
            species_id: species_id,
            habitat_id: habitat_id
        };

        let addSighting = `INSERT INTO sightings (researcher_id, species_id, habitat_id)
        VALUES ($1, $2)`;

        await db.none(addSighting, [researcher_id, species_id, habitat_id]);
        
        response.json({
            status: 'success',
            message: 'New sighting added.',
            payload: {
                sightingInfo: sightingInfo
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Sighting could not be added.',
            payload: null
        });
    }
});

// Delete a single sighting from the database
router.delete('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let deleteQuery = `DELETE FROM sightings WHERE id = $1`;
        await db.none(deleteQuery, [id])
        
        response.json({
            status: 'success',
            message: 'Sighting was sucessfully deleted.'
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'An error occurred while trying to complete request.'
        });
    }
});

module.exports = router;