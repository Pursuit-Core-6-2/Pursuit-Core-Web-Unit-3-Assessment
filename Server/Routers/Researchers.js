const express = require('express');
const router = express.Router();

const db = require('../../Database/database');


//GET /researchers: Get all researchers.
router.get('/', async (request, response) => {
    const requestQuery = `
        SELECT id, name, job_title FROM researchers WHERE available = true
        `;
    try {
        const allResearches = await db.any(requestQuery);
        if (allResearches.length) {
            response.json({
                status: 'success',
                message: 'retrieved all researchers',
                payload: allResearches
            })
        } else {
            response.json({
                status: 'success',
                message: 'Database is empty',
                payload: allResearches
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


// GET /researchers/:id: Get single researcher.
router.get('/:id', async (request, response) => {
    const researcherID = request.params.id;
    const requestQuery = `
        SELECT id, name, job_title FROM researchers WHERE id = $1 AND available = true
        `;
    try {
        const targetResearcher = await db.one(requestQuery, researcherID);
        response.json({
            status: 'success',
            message: `retrieved researcher with id: ${researcherID}`,
            payload: targetResearcher
        });
    } catch (err) {
        console.log(err);
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'error',
                message: 'No researcher is identified with the provided id',
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
    if (request.body.name && request.body.jobTitle) {
        request.userName = formatStringInputs(request.body.name);
        request.jobTitle = formatStringInputs(request.body.jobTitle);
        next();
    } else {
        response.status(400).json({
            status: 'error',
            message: 'Missing input information',
            payload: null
        })
    }
}

const addResearcher = async (request, response) => {
    const requestQuery = `
        INSERT INTO researchers (name, job_title) VALUES ($1, $2) RETURNING id, name, job_title
        `;
    
    try {
        const insertedResearcher = await db.one(requestQuery, [request.userName, request.jobTitle])
        response.status(201).json({
            status: 'success',
            message: `Added a researcher to the database`,
            payload: insertedResearcher
        });
    } catch (err) {
        console.log(err)
        response.status(500).json({
            status: 'error',
            message: 'Sorry, something went wrong',
            payload: null
        })
    }
}

// POST /researchers: Add new researcher.
router.post('/', checkValidBody, addResearcher)


//
const checkUpdateBody = (request, response, next) => {
    if (!request.body.name && !request.body.jobTitle) {
        response.status(400).json({
            status: 'error',
            message: 'Missing input information',
            payload: null
        })
    } else {
        next()
    }
}

const updateResearcher = async (request, response) => {
    const researcherID = request.params.id;
    let requestQuery = '';
    let requestArray = [];

    if (request.body.name && request.body.jobTitle) {
        const name = formatStringInputs(request.body.name);
        const title = formatStringInputs(request.body.jobTitle);
        requestQuery = `
            UPDATE researchers 
            SET name = $2, job_title = $3
            WHERE id = $1
            RETURNING id, name, job_title
        `;
        requestArray = [researcherID, name, title];

    } else if (request.body.name) {
        const name = formatStringInputs(request.body.name);
        requestQuery = `
            UPDATE researchers 
            SET name = $2
            WHERE id = $1
            RETURNING id, name, job_title
        `;
        requestArray = [researcherID, name];

    } else if (request.body.jobTitle) {
        const title = formatStringInputs(request.body.jobTitle);
        requestQuery = `
            UPDATE researchers 
            SET job_title = $2
            WHERE id = $1
            RETURNING id, name, job_title
        `;
        requestArray = [researcherID, title];
    }

    try {
        const updatedResearcher = await db.one(requestQuery, requestArray)
        response.json({
            status: 'success',
            message: `Updated researcher with id: ${researcherID}`,
            payload: updatedResearcher
        })
    } catch (err) {
        console.log(err)
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'error',
                message: 'No researcher is identified with the provided id',
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

//PATCH /researchers/:id: Update single researcher.
router.patch('/:id', checkUpdateBody, updateResearcher);


//DELETE /researchers/:id: Delete single researcher.
router.delete('/:id', async (request, response) => {
    const researcherID = request.params.id;
    // IF IT WAS A REAL DELETE QUE QUERY WILL BE LIKE:
    // DELETE FROM searchers WHERE id = $1
    const requestQuery = `
        UPDATE researchers 
        SET available = false
        WHERE id = $1
        RETURNING id, name, job_title
        `;

    try {
        const deletedSearcher = await db.one(requestQuery, researcherID)
        response.json({
            status: 'success',
            message: `Deleted researcher with id: ${researcherID}`,
            payload: deletedSearcher
        })

    } catch (err) {
        console.log(err)
        if (err.received === 0) {
            response.status(404).json({
                status: 'error',
                message: 'No researcher is identified with the provided id',
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