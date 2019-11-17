const express = require('express');
const Router = express.Router();
const db = require('../../database/db');

// GET /species: Get all species.
Router.get('/', async (req, res) => {
    try {
        const data = await db.any(`
            SELECT * FROM species
        `)

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Species returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Species not found",
                "payload": null
            });
        }
    }
})

// GET /species/:id: Get single species.
Router.get('/:id', async (req, res) => {
    try {
        const data = await db.one(
            `SELECT * FROM species WHERE sp_id = $/id/`
            , { id: req.params.id }
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Species returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Species not found",
                "payload": null
            });
        }
    }
})

// POST /species: Add new species.
Router.post('/', async (req, res) => {
    try {
        const data = await db.one(
            `INSERT INTO species (sp_name, sp_is_mammal) VALUES ($/name/, $/mammal/) RETURNING *`
            , req.body
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Species Added',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Species not added",
                "payload": null
            });
        }
    }
})

module.exports = Router;
