const express = require('express');
const Router = express.Router();
const db = require('../../database/db');

// GET /habitats: Get all habitats.
Router.get('/', async (req, res) => {
    try {
        const data = await db.any(`
            SELECT * FROM habitats
        `)

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Habitats returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Habitats not found",
                "payload": null
            });
        }
    }
})

// GET /habitats/:id: Get single habitat.
Router.get('/:id', async (req, res) => {
    try {
        const data = await db.one(
            `SELECT * FROM habitats WHERE h_id = $/id/`
            , { id: req.params.id }
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Habitat returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Habitat not found",
                "payload": null
            });
        }
    }
})

// POST /habitats: Add new habitat.
Router.post('/', async (req, res) => {
    try {
        const data = await db.one(
            `INSERT INTO habitats (h_category) VALUES ($/category/) RETURNING *`
            , req.body
        )

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Habitat Added',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Habitat not added",
                "payload": null
            });
        }
    }
})

module.exports = Router;
