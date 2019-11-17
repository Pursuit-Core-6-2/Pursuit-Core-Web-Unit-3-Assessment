const express = require('express');
const Router = express.Router();
const db = require('../../database/db');

// GET /researchers: Get all researchers.
Router.get('/', async (req, res) => {
    try {
        const data = await db.any(`
            SELECT * FROM researchers
        `)

        // Success
    res.status(200).json({
        status: 'success',
        message: 'Researchers returned',
        payload: data
    });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "researchers not found",
                "payload": null
            });
        }
    }
})

// GET /researchers/:id: Get single researcher.
Router.get('/:id', async (req, res) => {
    try {
        // const { id } = req.params;
        // console.log(id);
        const data = await db.one(`
            SELECT * FROM researchers WHERE r_id = $/id/
        `, req.params)

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Researcher returned',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "researcher not found",
                "payload": null
            });
        }
    }
})

// POST /researchers: Add new researcher.
Router.post('/', async (req, res) => {
    try {
        const data = await db.one(
            `INSERT INTO researchers (r_name, r_job_title) VALUES ($/name/, $/job_title/) RETURNING *`, 
            req.body
        )

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Researcher added',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "researchers not added",
                "payload": null
            });
        }
    }
})

// PATCH /researchers/:id: Update single researcher.
Router.patch('/:id', async (req, res) => {
    try {
        let data;
        if (req.body.name && req.body.job_title) {
            data = await db.one(
                `UPDATE researchers SET r_name = $/name/, r_job_title = $/job_title/ WHERE r_id = $/id/ RETURNING *`, 
                {id: req.params.id, name: req.body.name, job_title: req.body.job_title}
            )
            
        } else if (req.body.job_title) {
            data = await db.one(
                `UPDATE researchers SET r_job_title = $/job_title/ WHERE r_id = $/id/ RETURNING *`, 
                {id: req.params.id, job_title: req.body.job_title}
            )
        } else {
            data = await db.one(
                `UPDATE researchers SET r_name = $/name/ WHERE r_id = $/id/ RETURNING *`, 
                {id: req.params.id, name: req.body.name}
            )
        }
        
        // Success
        res.status(200).json({
            status: 'success',
            message: 'Researcher updated',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "researchers not updated",
                "payload": null
            });
        }
    }
});

// DELETE /researchers/:id: Delete single researcher.
Router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        id = Number(id);
        const data = await db.one(
            `DELETE FROM researchers WHERE r_id = $/id/ RETURNING *`
            , { id }
        )

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Researcher returned',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            // Fail
            res.status(400).json({
                "status": "error",
                "message": "researcher not found",
                "payload": null
            });
        }
    }
})

module.exports = Router;
