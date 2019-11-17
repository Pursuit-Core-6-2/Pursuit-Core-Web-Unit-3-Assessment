const express = require('express');
const router = express.Router();

const db = require('../../Database/database');
/*
GET /animals: Get all animals.
GET /animals/:id: Get single animal.
POST /animals: Add new animal.
PATCH /animals/:id: Update single animal.
DELETE /animals/:id: Delete single animal.
*/


//GET /animals: Get all animals.
router.get('/', async (request, response) => {
    const requestQuery = `
        SELECT id, species_id, nickname FROM animals WHERE available = true
        `;
    try {
        const allAnimals = await db.any(requestQuery);
        if (allAnimals.length) {
            response.json({
                status: 'success',
                message: 'retrieved all animals',
                payload: allAnimals
            })
        } else {
            response.json({
                status: 'success',
                message: 'Database is empty',
                payload: allAnimals
            })
        }
    } catch (err) {
        console.log(err),
        response.status(500).json({
            status: 'failed',
            message: 'Sorry, something went wrong'
        })
    }
})


// GET /animals/:id: Get single animal.
router.get('/:id', async (request, response) => {
    const animalID = request.params.id;
    const requestQuery = `
        SELECT id, species_id, nickname FROM animals WHERE id = $1 AND available = true
        `;
    try {
        const targetAnimal = await db.one(requestQuery, animalID);
        response.json({
            status: 'success',
            message: `retrieved animal with id: ${animalID}`,
            payload: targetAnimal
        });
    } catch (err) {
        console.log(err);
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'failed',
                message: 'No animal is identified with the provided id'
            })
        } else {
            response.status(500).json({
                status: 'failed',
                message: 'Sorry, something went wrong'
            })
        }
    }
})


//FUNCTION TO FORMAT species_idS AND JOB TITLES
const formatStringInputs = (str) => {
    str = str.trim()
    const arr = str.split(' ')
    let outputStr = '';
    for (let word of arr) {
        if (word && typeof word === 'string' && word !== ' ') {
            outputStr += word[0].toUpperCase() + (word.slice(1, word.length)).toLowerCase() + ' ';
        }
    }
    if (outputStr) {
        return outputStr;
    }
    return str;
}

const checkValidBody = (request, response, next) => {
    const speciesID = request.body.species_id;
    const nickname = request.body.nickname;

    if (speciesID && !isNaN(parseInt(speciesID)) 
        && (parseInt(speciesID) + '').length === speciesID.length
        && nickname) {
        request.speciesID = parseInt(speciesID);
        request.nickname = formatStringInputs(nickname);
        next();
    } else {
        response.status(400).json({
            status: 'failed',
            message: 'Missing input information OR wrong input form'
        })
    }
}

const addAnimal = async (request, response) => {
    const requestQuery = `
        INSERT INTO animals (species_id, nickname) VALUES ($1, $2) RETURNING id, species_id, nickname
        `;
    
    try {
        const insertedAnimal = await db.one(requestQuery, [request.speciesID, request.nickname])
        response.status(201).json({
            status: 'success',
            message: `Added a animal to the database`,
            payload: insertedAnimal
        });
    } catch (err) {
        console.log(err)
        if (err.code === '23503') {
            response.status(400).json({
                status: 'failed',
                message: 'The referenced species does not exist'
            })
        }
        response.status(500).json({
            status: 'failed',
            message: 'Sorry, something went wrong'
        })
    }
}

// POST /animals: Add new animal.
router.post('/', checkValidBody, addAnimal)




module.exports = router;