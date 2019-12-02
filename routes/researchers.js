const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all Researchers from database
router.get('/', async (request, response) => {
    console.log('currently running');

    try {
        let researchers = await db.any(`SELECT * FROM researchers`);
        
        response.json({
            status: 'success',
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
        
        let researcher = await db.one(researcherQuery, [id]);
        
        response.json({
            status: 'success',
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
    let name = request.body.name;
    let job_title = request.body.job_title;

    try {
        let researcherInfo = {
            name: name,
            job_title: job_title
        };

        let createResearcher = `INSERT INTO researchers (name, job_title)
        VALUES ($1, $2)`;

        await db.none(createResearcher, [name, job_title]);
        
        response.json({
            status: 'success',
            message: 'New researcher created.',
            payload: {
                researcherInfo: researcherInfo
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Researcher could not be created.',
            payload: null
        });
    }
});

// Update a single researcher's info
router.patch('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;
    let name = request.body.name;
    let job_title = request.body.job_title;

    try {
        if (!name && !job_title) {
            response.json({
                status: 'failed',
                message: 'Patch query cannot be blank',
                payload: null
            })
        } else if (name && !job_title) {
            let patchQuery = `UPDATE researchers SET name = $1 WHERE id = $2`
            await db.none(patchQuery, [name, id]);
            
            response.json({
                status: 'success',
                message: 'Researcher name sucessfully patched.',
                payload: {
                    patchInfo: {
                        newName: name
                    }
                }
            })
        } else if (!name && job_title) {
            let patchQuery = `UPDATE researchers SET job_title = $1 WHERE id = $2`
            await db.none(patchQuery, [job_title, id]);

            response.json({
                status: 'success',
                message: 'Researcher title sucessfully patched.',
                payload: {
                    patchInfo: {
                        newTitle: job_title
                    }
                }
            })
        } else {
            let patchQuery = `UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3`
            await db.none(patchQuery, [name, job_title, id]);

            response.json({
                status: 'success',
                message: 'Researcher sucessfully patched.',
                payload: {
                    patchInfo: {
                        newName: name,
                        newTitle: job_title
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'An error occured while trying to complete request',
            payload: null
        });
    }
});

// Delete selected researcher from database
router.delete('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let deleteQuery = `DELETE FROM researchers WHERE id = $1`;
        await db.none(deleteQuery, [id])
        
        response.json({
            status: 'success',
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