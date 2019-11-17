const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all Species from database
router.get('/', async (request, response) => {
    console.log('currently running');

    try {
        let species = await db.any(`SELECT * FROM species`);
        response.json({
            status: 'success',
            message: 'Retrieved all of the species.',
            payload: {
                species: species
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Something went wrong. Could not retrieve all of the researchers',
            payload: null
        })
    }
})

//  Get a single species by id number 
router.get('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let speciesQuery = `SELECT * FROM species WHERE id = $1`

        let species = await db.one(speciesQuery, [id]);

        response.json({
            status: 'success',
            message: 'Retrieved selected species',
            payload: {
                species: species
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Species not found.',
            payload: null
        });
    }
});

// Create a new species
router.post('/', async (request, response) => {
    console.log('currently running');

    let name = request.body.name;
    let is_mammal = request.body.is_mammal;
    
    try {
        let speciesInfo = {
            name: name,
            is_mammal: is_mammal
        };

        let createSpecies = `INSERT INTO species (name, is_mammal)
        VALUES ($1, $2)`;

        await db.none(createSpecies, [name, is_mammal]);

        response.json({
            status: 'success',
            message: 'New species created.',
            payload: {
                speciesInfo: speciesInfo
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Species could not be created.',
            payload: null
        });
    }
})

module.exports = router;