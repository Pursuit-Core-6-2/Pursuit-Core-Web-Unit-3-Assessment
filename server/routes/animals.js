const express = require('express');
const Router = express.Router();
const db = require('../../database/db');

// GET /animals: Get all animals.
Router.get('/', async (req, res) => {
    try {
        const data = await db.any(`
            SELECT * FROM animals
        `)

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Animals returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Animals not found",
                "payload": null
            });
        }
    }
})

// GET /animals/:id: Get single animal.
Router.get('/:id', async (req, res) => {
    try {
        // const { id } = req.params;
        // console.log(id);
        const data = await db.one(`
            SELECT * FROM animals WHERE a_id = $/id/
        `, req.params)

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Animal returned',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Animal not found",
                "payload": null
            });
        }
    }
})

// POST /animals: Add new animal.
Router.post('/', async (req, res) => {
    try {
        const data = await db.one(
            `INSERT INTO animals (a_species_id, a_nickname) VALUES ($/species_id/, $/nickname/) RETURNING *`, 
            req.body
        )

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Animal added',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Animal not added",
                "payload": null
            });
        }
    }
})

// PATCH /animals/:id: Update single animal.
Router.patch('/:id', async (req, res) => {
    try {
        let data;
        if (req.body.species_id && req.body.nickname) {
            data = await db.one(
                `UPDATE animals SET a_nickname = $/nickname/, a_species_id = $/species_id/ WHERE a_id = $/id/ RETURNING *`, 
                {id: req.params.id, nickname: req.body.nickname, species_id: req.body.species_id}
            )
            
        } else if (req.body.species_id) {
            data = await db.one(
                `UPDATE animals SET a_species_id = $/species_id/ WHERE a_id = $/id/ RETURNING *`, 
                {id: req.params.id, species_id: req.body.species_id}
            )
        } else {
            data = await db.one(
                `UPDATE animals SET a_nickname = $/nickname/ WHERE a_id = $/id/ RETURNING *`, 
                {id: req.params.id, nickname: req.body.nickname}
            )
        }
        
        // Success
        res.status(200).json({
            status: 'success',
            message: 'Animal updated',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Animal not updated",
                "payload": null
            });
        }
    }
});

// DELETE /animals/:id: Delete single animal.
Router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        id = Number(id);
        const data = await db.one(
            `DELETE FROM animals WHERE a_id = $/id/ RETURNING *`
            , { id }
        )

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Animal deleted',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "Animal not found",
                "payload": null
            });
        }
    }
})

module.exports = Router;
