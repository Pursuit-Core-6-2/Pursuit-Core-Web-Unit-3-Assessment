const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')

///////////////////////////////////////////////////

//route to get all species 
router.get('/', async(req, res) => {
    
    try {
        const requestQuery = `SELECT * FROM species`
        let allSpecies = await db.any(requestQuery)
       
        res.status(200)
        res.json({
            payload: allSpecies,
            status: 'successful',
            messsge: `The data was successfully retrieved`
        })
    } catch (error){
        res.status(404)
        res.json({
            status: 'failed',
            message: `There was an error`
        })
    }
})
////////////////////////////////////////////////////////////////////

//route to get single species using the specie's id 
router.get('/:id', async(req, res) => {
    try {
        const requestQuery = `SELECT * FROM species WHERE id = $1`
        
        let speciesById = await db.any(requestQuery, [req.params.id])
       
        res.status(200)
        res.json({
            payload: speciesById,
            status: 'successful',
            message: `Successfully retrieved specie's data`
        })

    } catch (error) {
        res.status(404)
        res.json({
            status: 'failed', 
            message: `Failure to retrieve data`
        })
    }
})

//route to add new species 
router.post('/', async(req, res) => {
    try {
        const insertQuery = `INSERT INTO species(name, is_mammal) VALUES($1, $2)`
        await db.none(insertQuery, [req.body.name, req.body.is_mammal])
        console.log(req.body.name)
            res.status(201)
            res.json({
                status: 'success',
                name: req.body.name,
                is_mammal: req.body.is_mammal
            })
    } catch  (error) {
       res.status(400)
       res.json({
           status: 'failed', 
           message: `Unable to add specie to the data`

       })

    }
})


module.exports = router;