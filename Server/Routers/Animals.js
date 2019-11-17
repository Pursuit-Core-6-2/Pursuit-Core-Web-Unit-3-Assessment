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
            status: 'error',
            message: 'Sorry, something went wrong',
            payload: null
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
                status: 'error',
                message: 'No animal is identified with the provided id',
                payload: null
            })
        } else {
            response.status(500).json({
                status: 'error',
                message: 'Sorry, something went wrong',
                payload: null
            })
        }
    }
})


//FUNCTION TO FORMAT species_idS AND JOB nicknameS
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
    const speciesID = request.body.speciesID;
    const nickname = request.body.nickname;

    if (speciesID && !isNaN(parseInt(speciesID)) 
        && (parseInt(speciesID) + '').length === speciesID.length
        && nickname) {
        request.speciesID = parseInt(speciesID);
        request.nickname = formatStringInputs(nickname);
        next();
    } else {
        response.status(400).json({
            status: 'error',
            message: 'Missing input information OR wrong input form',
            payload: null
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
                status: 'error',
                message: 'The referenced species does not exist',
                payload: null
            })
        }
        response.status(500).json({
            status: 'error',
            message: 'Sorry, something went wrong',
            payload: null
        })
    }
}

// POST /animals: Add new animal.
router.post('/', checkValidBody, addAnimal)


//
const checkUpdateBody = (request, response, next) => {
    const speciesID = request.body.speciesID;
    const nickname = request.body.nickname;

    if ((!speciesID || isNaN(parseInt(speciesID)) 
        || (parseInt(speciesID) + '').length !== speciesID.length)
        && !nickname) {
        response.status(400).json({
            status: 'error',
            message: 'Missing input information OR wrong input form',
            payload: null
        })
    } else {
        next()
    }
}

const updateAnimal = async (request, response) => {
    const animalID = request.params.id;
    let requestQuery = '';
    let requestArray = [];

    if (request.body.speciesID && request.body.nickname) {
        const speciesID = parseInt(request.body.speciesID);
        const nickname = formatStringInputs(request.body.nickname);
        requestQuery = `
            UPDATE animals 
            SET species_id = $2, nickname = $3
            WHERE id = $1
            RETURNING id, species_id, nickname
        `;
        requestArray = [animalID, speciesID, nickname];

    } else if (request.body.speciesID) {
        const speciesID = parseInt(request.body.speciesID);
        requestQuery = `
            UPDATE animals 
            SET species_id = $2
            WHERE id = $1
            RETURNING id, species_id, nickname
        `;
        requestArray = [animalID, speciesID];

    } else if (request.body.nickname) {
        const nickname = formatStringInputs(request.body.nickname);
        requestQuery = `
            UPDATE animals 
            SET nickname = $2
            WHERE id = $1
            RETURNING id, species_id, nickname
        `;
        requestArray = [animalID, nickname];
    }

    try {
        const updatedAnimal = await db.one(requestQuery, requestArray)
        response.json({
            status: 'success',
            message: `Updated animal with id: ${animalID}`,
            payload: updatedAnimal
        })
    } catch (err) {
        console.log(err)
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'error',
                message: 'No animal is identified with the provided id',
                payload: null
            })
        } else {
            response.status(500).json({
                status: 'error',
                message: 'Sorry, something went wrong',
                payload: null
            })
        }
    }
}

//PATCH /animals/:id: Update single animal.
router.patch('/:id', checkUpdateBody, updateAnimal);


//DELETE /animals/:id: Delete single animal.
router.delete('/:id', async (request, response) => {
    const animalID = request.params.id;
    // IF IT WAS A REAL DELETE QUE QUERY WILL BE LIKE:
    // DELETE FROM animals WHERE id = $1
    const requestQuery = `
        UPDATE animals 
        SET available = false
        WHERE id = $1 AND available = true
        RETURNING id, species_id, nickname
        `;

    try {
        const deletedAnimal = await db.one(requestQuery, animalID)
        response.json({
            status: 'success',
            message: `Deleted animal with id: ${animalID}`,
            payload: deletedAnimal
        })

    } catch (err) {
        console.log(err)
        if (err.received === 0) {
            response.status(404).json({
                status: 'error',
                message: 'No animal is identified with the provided id',
                payload: null
            })
        } else {
            response.status(500).json({
                status: 'error',
                message: 'Sorry, something went wrong',
                payload: null
            })
        }
    }
})


module.exports = router;