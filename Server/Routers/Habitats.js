const express = require('express');
const router = express.Router();

const db = require('../../Database/database');

//GET /habitats: Get all habitats.
router.get('/', async (request, response) => {
    const requestQuery = `
        SELECT id, category FROM habitats WHERE available = true
        `;
    try {
        const allHabitats = await db.any(requestQuery);
        if (allHabitats.length) {
            response.json({
                status: 'success',
                message: 'retrieved all habitats',
                payload: allHabitats
            })
        } else {
            response.json({
                status: 'success',
                message: 'Database is empty',
                payload: allHabitats
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


// GET /habitats/:id: Get single habitats.
router.get('/:id', async (request, response) => {
    const habitatsID = request.params.id;
    const requestQuery = `
        SELECT id, category FROM habitats WHERE id = $1 AND available = true
        `;
    try {
        const targetHabitat = await db.one(requestQuery, habitatsID);
        response.json({
            status: 'success',
            message: `retrieved a single habitat with id: ${habitatsID}`,
            payload: targetHabitat
        });
    } catch (err) {
        console.log(err);
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'failed',
                message: 'No habitats is identified with the provided id'
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
    if (request.body.category) {
        request.category = formatStringInputs(request.body.category);
        next();
    } else {
        response.status(400).json({
            status: 'failed',
            message: 'Missing input information'
        })
    }
}

const addHabitats = async (request, response) => {
    const requestQuery = `
        INSERT INTO habitats (category) VALUES ($1) RETURNING id, category
        `;
    
    try {
        const insertedHabitat = await db.one(requestQuery, request.category)
        response.status(201).json({
            status: 'success',
            message: `Added a habitat to the database`,
            payload: insertedHabitat
        });
    } catch (err) {
        console.log(err)
        response.status(500).json({
            status: 'failed',
            message: 'Sorry, something went wrong'
        })
    }
}

// POST /habitats: Add new habitat.
router.post('/', checkValidBody, addHabitats)

module.exports = router;