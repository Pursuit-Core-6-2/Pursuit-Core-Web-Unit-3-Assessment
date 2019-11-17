const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all researchers from database
router.get('/', async (request, response) => {
    console.log('currently running');

    try {
        let researchers = await db.any('SELECT * FROM researchers');
        response.json({
            status: 'sucess',
            message: 'Retrieved all of the researchers.',
            payload: {
                researchers: researchers
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Something went wrong. Could not retrieve all of the researchers.',
            payload: null
        });
    }
});

// Get a single researcher by their id number
router.get('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let researcherQuery = `SELECT * FROM researchers WHERE id = $1`;
        let researcher = await db.one(researcherQuery, [id])
        response.json({
            status: 'sucess',
            message: 'Retrieved selected researcher.',
            payload: {
                researcher: researcher
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Researcher not found.',
            payload: null
        });
    }
});

// Create a new Researcher
router.post('/', async (request, response) => {
    console.log('currently running');

    try {
        let createResearcher = `INSERT INTO researchers (name, job_title)
        VALUES ($1, $2)`;

        await db.none(createResearcher, [request.body.name, request.body.job_title]);
        response.json({
            status: 'sucess',
            message: 'New researcher created.'
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Researcher could not be created.'
        })
    }
});

// Update a single researcher's info
router.patch('/:id', async (request, response) => {
    let id = request.params.id;
    let newName = request.body.name;
    let newTitle = request.body.job_title;

    try {
        let patchInfo = {
            name: newName,
            title: newTitle
        }
        let patchQuery = `UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3`
        await db.none(patchQuery, [newName, newTitle, id]);

        response.json({
            status: 'sucess',
            message: 'Researcher sucessfully patched.',
            payload: patchInfo
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'An error occured while trying to complete request'
        });
    }
});

// Delete a single researcher
router.delete('/:id', async (request, response) => {
    let id = request.params.id;

    try {
        let deleteQuery = `DELETE FROM researchers WHERE id = $1`;
        await db.none(deleteQuery, [id])
        
        response.json({
            status: 'sucess',
            message: 'Researcher was sucessfully deleted.'
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