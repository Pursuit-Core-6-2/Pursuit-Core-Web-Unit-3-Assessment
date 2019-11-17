const express = require('express');
const Router = express.Router();
const db = require('../../database/db');

// GET /sightings: Get all sightings.
Router.get('/', async (req, res) => {
    try {
        const data = await db.any(`
            SELECT * FROM sightings
        `)

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Sightings returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Sightings not found",
                "payload": null
            });
        }
    }
})

// GET /sightings/species/:id: Get all sightings of a specific species.
Router.get('/species/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const data = await db.any(
            `SELECT * FROM sightings  WHERE si_species_id = $/id/`
            , { id }
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Sightings returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Sightings not found",
                "payload": null
            });
        }
    }
})

// GET /sightings/researchers/:id: Get all sightings for a specific researcher.
Router.get('/researchers/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const data = await db.any(
            `SELECT * FROM sightings  WHERE si_researcher_id = $/id/`
            , { id }
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Sightings returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Sightings not found",
                "payload": null
            });
        }
    }
})

// GET /sightings/habitats/:id: Get all sightings for a specific habitat.
Router.get('/habitats/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const data = await db.any(
            `SELECT * FROM sightings  WHERE si_habitat_id = $/id/`
            , { id }
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Sightings returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Sightings not found",
                "payload": null
            });
        }
    }
})

// POST /sightings: Add new sighting.
Router.post('/', async (req, res) => {
    try {
        let species_id = Number(req.body.species_id);
        const data = await db.one(
            `INSERT INTO sightings (si_species_id, si_researcher_id, si_habitat_id) VALUES 
            ($/species_id/, $/researcher_id/, $/habitat_id/) RETURNING *`
            , { species_id: species_id,  researcher_id: req.body.researcher_id, habitat_id: req.body.habitat_id}
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Sightings returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Sightings not found",
                "payload": null
            });
        }
    }
})

// DELETE /sightings/:id: Delete single sighting.
Router.delete('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const data = await db.one(
            `DELETE FROM sightings WHERE si_id = $/id/ RETURNING *`
            , { id }
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Sightings returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Sightings not found",
                "payload": null
            });
        }
    }
})

module.exports = Router;
