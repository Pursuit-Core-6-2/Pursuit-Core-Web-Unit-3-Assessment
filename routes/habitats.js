const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all habitats from database
router.get('/', async (request, response) => {
    console.log('currently running');

    try {
        let habitats = await db.any(`SELECT * FROM habitats`);
        response.json({
            status: 'success',
            message: 'Retrieved all of the habitats.',
            payload: {
                habitats: habitats
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Something went wrong. Could not retrieve all of the habitats',
            payload: null
        })
    }
})

//  Get a single habitat by id number 
router.get('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let habitatsQuery = `SELECT * FROM species WHERE id = $1`

        let habitat = await db.one(habitatsQuery, [id]);

        response.json({
            status: 'success',
            message: 'Retrieved selected habitat',
            payload: {
                habitat: habitat
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Habitat not found.',
            payload: null
        });
    }
});

// Create a new habitat
router.post('/', async (request, response) => {
    console.log('currently running');

    let category = request.body.category;
    
    try {
        let habitatInfo = {
            category: category
        };

        let createHabitat = `INSERT INTO habitats (category)
        VALUES ($1)`;

        await db.none(createHabitat, [category]);

        response.json({
            status: 'success',
            message: 'New habitat created.',
            payload: {
                habitatInfo: habitatInfo
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Habitat could not be created.',
            payload: null
        });
    }
});

module.exports = router;