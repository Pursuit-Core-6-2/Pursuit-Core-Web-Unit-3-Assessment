const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all Animals from database
router.get('/', async (request, response) => {
    console.log('currently running');

    try {
        let animals = await db.any(`SELECT * FROM animals`);

        response.json({
            status: 'success',
            message: 'Retrieved all of the animals',
            payload: {
                animals: animals
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Something went wrong. Could not retrieve all of the animals.',
            payload: null
        });
    }
});

// Get a single animal by their id number
router.get('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let animalQuery = `SELECT * FROM animals WHERE id = $1`;

        let animal = await db.one(animalQuery, [id])

        response.json({
            status: 'success',
            message: 'Retrieved selected animal.',
            payload: {
                animal: animal
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Animal not found.',
            payload: null
        });
    }
});

// Create a new Animal
router.post('/', async (request, response) => {
    console.log('currently running');
    let species_id = request.body.species_id;
    let nickname = request.body.nickname;

    try {
        let animalInfo = {
            species_id: species_id,
            nickname: nickname
        };

        let createAnimal = `INSERT INTO animals (species_id, nickname)
        VALUES ($1, $2)`;

        await db.none(createAnimal, [species_id, nickname]);
        
        response.json({
            status: 'success',
            message: 'New animal; created.',
            payload: {
                animalInfo: animalInfo
            }
        });
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'Animal could not be created.',
            payload: null
        });
    }
});

// Update a single animal's info
router.patch('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;
    let newSpecies_id = request.body.species_id;
    let newNickname = request.body.nickname;

    try {
        let patchInfo = {
            species_id: newSpecies_id,
            nickname: newNickname
        }

        let patchQuery = `UPDATE researchers SET species_id = $1, nickname = $2 WHERE id = $3`
        await db.none(patchQuery, [newSpecies_id, newNickname, id]);

        response.json({
            status: 'success',
            message: 'Researcher sucessfully patched.',
            payload: {
                patchInfo: patchInfo
            }
        })
    } catch (error) {
        console.log(error);
        response.json({
            status: 'error',
            message: 'An error occured while trying to complete request',
            payload: null
        });
    }
});

// Delete selected animal from database
router.delete('/:id', async (request, response) => {
    console.log('currently running');

    let id = request.params.id;

    try {
        let deleteQuery = `DELETE FROM animals WHERE id = $1`;
        await db.none(deleteQuery, [id])
        
        response.json({
            status: 'success',
            message: 'Animal was sucessfully deleted.'
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