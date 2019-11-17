const express = require('express');
const router = express.Router();

const db = require('../../Database/database');

/*
POST /sightings: Add new sighting.
DELETE /sightings/:id: Delete single sighting.
*/

//GET /sightings: Get all sightings.
router.get('/', async (request, response) => {
    const requestQuery = `
        SELECT id, researcher_id, species_id, habitat_id FROM sightings WHERE available = true
        `;
    try {
        const allSightings = await db.any(requestQuery);
        if (allSightings.length) {
            response.json({
                status: 'success',
                message: 'retrieved all sightings',
                payload: allSightings
            })
        } else {
            response.json({
                status: 'success',
                message: 'Database is empty',
                payload: allSightings
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


// GET /sightings/species/:id: Get all sightings of a specific species.
router.get('species/:id', async (request, response) => {
    const speciesID = request.params.id;
    const requestQuery = `
        SELECT id, researcher_id, species_id, habitat_id FROM sightings WHERE species_id = $1 AND available = true
        `;

    try {
        const allSightings = await db.any(requestQuery, speciesID);
        if (allSightings.length) {
            response.json({
                status: 'success',
                message: `retrieved all sightings relevant to species id: ${speciesID}`,
                payload: allSightings
            })
        } else {
            response.json({
                status: 'success',
                message: `No match for species id: ${speciesID}`,
                payload: allSightings
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


//GET /sightings/researchers/:id: Get all sightings for a specific researcher.
router.get('/researchers/:id', async (request, response) => {
    const researcherID = request.params.id;
    const requestQuery = `
        SELECT id, researcher_id, species_id, habitat_id FROM sightings WHERE researcher_id = $1 AND available = true
        `;

    try {
        const allSightings = await db.any(requestQuery, researcherID);
        if (allSightings.length) {
            response.json({
                status: 'success',
                message: `retrieved all sightings relevant to researcher id: ${researcherID}`,
                payload: allSightings
            })
        } else {
            response.json({
                status: 'success',
                message: `No match for researcher id: ${researcherID}`,
                payload: allSightings
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


// GET /sightings/habitats/:id: Get all sightings for a specific habitat.
router.get('/habitats/:id', async (request, response) => {
    const habitatID = request.params.id;
    const requestQuery = `
        SELECT id, researcher_id, species_id, habitat_id FROM sightings WHERE habitat_id = $1 AND available = true
        `;

    try {
        const allSightings = await db.any(requestQuery, habitatID);
        if (allSightings.length) {
            response.json({
                status: 'success',
                message: `retrieved all sightings relevant to habitat id: ${habitatID}`,
                payload: allSightings
            })
        } else {
            response.json({
                status: 'success',
                message: `No match for habitat id: ${habitatID}`,
                payload: allSightings
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



const checkValidBody = (request, response, next) => {
    const researcherID = request.body.researcherID
    const speciesID = request.body.speciesID;
    const habitatID = request.body.habitatID;

    if (researcherID && !isNaN(parseInt(researcherID)) 
        && (parseInt(researcherID) + '').length === researcherID.length
        && speciesID && !isNaN(parseInt(speciesID)) 
        && (parseInt(speciesID) + '').length === speciesID.length
        && habitatID && !isNaN(parseInt(habitatID)) 
        && (parseInt(habitatID) + '').length === habitatID.length) {
            request.researcherID = parseInt(researcherID);
            request.speciesID = parseInt(speciesID);
            request.habitatID = parseInt(habitatID);
        next();
    } else {
        response.status(400).json({
            status: 'error',
            message: 'Missing input information OR wrong input form',
            payload: null
        })
    }
}

const addSighting = async (request, response) => {
    const requestQuery = `
        INSERT INTO sightings (researcher_id, species_id, habitat_id) VALUES ($1, $2, $3) RETURNING id, researcher_id, species_id, habitat_id
        `;
    
    try {
        const insertedSighting = await db.one(requestQuery, [request.researcherID, request.speciesID, request.habitatID])
        response.status(201).json({
            status: 'success',
            message: `Added a sighting to the database`,
            payload: insertedSighting
        });
    } catch (err) {
        console.log(err)
        if (err.code === '23503') {
            response.status(400).json({
                status: 'error',
                message: 'The referenced researcher / species / habitat does not exist',
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

// POST /sightings: Add new sighting.
router.post('/', checkValidBody, addSighting)


//
const checkUpdateBody = (request, response, next) => {
    const researcherID = request.body.researcherID;
    const speciesID = request.body.speciesID;
    const habitatID = request.body.habitatID;

    if ((!researcherID || isNaN(parseInt(researcherID)) 
        || (parseInt(researcherID) + '').length !== researcherID.length)
        && (!speciesID || isNaN(parseInt(speciesID)) 
        || (parseInt(speciesID) + '').length !== speciesID.length)
        && (!habitatID || isNaN(parseInt(habitatID)) 
        || (parseInt(habitatID) + '').length !== habitatID.length)) {
            response.status(400).json({
                status: 'error',
                message: 'Missing input information OR wrong input form',
                payload: null
        })
    } else {
        next()
    }
}

const updateSighting = async (request, response) => {
    const sightingID = request.params.id;

    let researcherID = request.body.researcherID;
    let speciesID = request.body.speciesID;
    let habitatID = request.body.habitatID;

    let requestQuery = '';
    let requestArray = [];

    if (researcherID && speciesID && habitatID) {
        researcherID = parseInt(researcherID);
        speciesID = parseInt(speciesID);
        habitatID = parseInt(habitatID);

        requestQuery = `
            UPDATE sightings 
            SET researcher_id = $2, species_id = $3, habitat_id = $4
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, researcherID, speciesID, habitatID];

    } else if (researcherID && speciesID) {
        researcherID = parseInt(researcherID);
        speciesID = parseInt(speciesID);

        requestQuery = `
            UPDATE sightings 
            SET researcher_id = $2, species_id = $3
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, researcherID, speciesID];

    } else if (researcherID && habitatID) {
        researcherID = parseInt(researcherID);
        habitatID = parseInt(habitatID);

        requestQuery = `
            UPDATE sightings 
            SET researcher_id = $2, habitat_id = $3
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, researcherID, habitatID];

    } else if (speciesID && habitatID) {
        speciesID = parseInt(speciesID);
        habitatID = parseInt(habitatID);

        requestQuery = `
            UPDATE sightings 
            SET species_id = $2, habitat_id = $3
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, speciesID, habitatID];

    } else if (researcherID) {
        researcherID = parseInt(researcherID);

        requestQuery = `
            UPDATE sightings 
            SET researcher_id = $2
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, researcherID];

    } else if (speciesID) {
        speciesID = parseInt(speciesID);

        requestQuery = `
            UPDATE sightings 
            SET species_id = $2
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, speciesID];

    } else if (habitatID) {
        habitatID = parseInt(habitatID);

        requestQuery = `
            UPDATE sightings 
            SET habitat_id = $2
            WHERE id = $1
            RETURNING id, researcher_id, species_id, habitat_id
        `;
        requestArray = [sightingID, habitatID];

    }

    try {
        const updatedSighting = await db.one(requestQuery, requestArray)
        response.json({
            status: 'success',
            message: `Updated sighting with id: ${sightingID}`,
            payload: updatedSighting
        })
    } catch (err) {
        console.log(err)
        if (err.received === 0 || err.received > 1) {
            response.status(404).json({
                status: 'error',
                message: 'No sighting is identified with the provided id',
                payload: null
            })
        } else if (err.code === '23503') {
            response.status(400).json({
                status: 'error',
                message: 'The referenced researcher / species / habitat does not exist',
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

//PATCH /sightings/:id: Update single sighting.
router.patch('/:id', checkUpdateBody, updateSighting);


//DELETE /sightings/:id: Delete single sighting.
router.delete('/:id', async (request, response) => {
    const sightingID = request.params.id;
    // IF IT WAS A REAL DELETE QUE QUERY WILL BE LIKE:
    // DELETE FROM sightings WHERE id = $1
    const requestQuery = `
        UPDATE sightings 
        SET available = false
        WHERE id = $1 AND available = true
        RETURNING id, researcher_id, species_id, habitat_id
        `;

    try {
        const deletedSighting = await db.one(requestQuery, sightingID)
        response.json({
            status: 'success',
            message: `Deleted sighting with id: ${sightingID}`,
            payload: deletedSighting
        })

    } catch (err) {
        console.log(err)
        if (err.received === 0) {
            response.status(404).json({
                status: 'error',
                message: 'No sighting is identified with the provided id',
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