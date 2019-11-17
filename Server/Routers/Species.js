const express = require('express');
const router = express.Router();

const db = require('../../Database/database');


/*
GET /species: Get all species.
GET /species/:id: Get single species.
POST /species: Add new species.
*/

//GET /species: Get all species.
router.get('/', async (request, response) => {
    const requestQuery = `
        SELECT id, name, is_mammal FROM species WHERE available = true
        `;
    try {
        const allSpecies = await db.any(requestQuery);
        if (allSpecies.length) {
            response.json({
                status: 'success',
                message: 'retrieved all species',
                payload: allSpecies
            })
        } else {
            response.json({
                status: 'success',
                message: 'Database is empty',
                payload: allSpecies
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


// GET /species/:id: Get single species.
router.get('/:id', async (request, response) => {
    const speciesID = request.params.id;
    const requestQuery = `
        SELECT id, name, is_mammal FROM species WHERE id = $1 AND available = true
        `;
    try {
        const targetSpecies = await db.one(requestQuery, speciesID);
        response.json({
            status: 'success',
            message: `retrieved a single specie with id: ${speciesID}`,
            payload: targetSpecies
        });
    } catch (err) {
        console.log(err);
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'failed',
                message: 'No species is identified with the provided id'
            })
        } else {
            response.status(500).json({
                status: 'failed',
                message: 'Sorry, something went wrong'
            })
        }
    }
})


//FUNCTION TO FORMAT NAMES AND JOB TITLES
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
    if (request.body.name && request.body.isMammal 
        && (request.body.isMammal.toLowerCase() === 'true' || request.body.isMammal.toLowerCase() === 'false')) {
        request.speciesName = formatStringInputs(request.body.name);
        request.isMammal = (request.body.isMammal).toLowerCase();
        next();
    } else {
        response.status(400).json({
            status: 'failed',
            message: 'Missing input information OR wrong input form'
        })
    }
}

const addSpecies = async (request, response) => {
    const requestQuery = `
        INSERT INTO species (name, is_mammal) VALUES ($1, $2) RETURNING id, name, is_mammal
        `;
    
    try {
        const insertedSpecies = await db.one(requestQuery, [request.speciesName, request.isMammal])
        response.status(201).json({
            status: 'success',
            message: `Added a species to the database`,
            payload: insertedSpecies
        });
    } catch (err) {
        console.log(err)
        response.status(500).json({
            status: 'failed',
            message: 'Sorry, something went wrong'
        })
    }
}

// POST /species: Add new specie.
router.post('/', checkValidBody, addSpecies)

module.exports = router;