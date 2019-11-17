const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

router.get('/', async (req, res)=> {
    const inputQuery = (`SELECT * FROM sightings`)
    // const inputQuery2 = (`SELECT sightings.researcher_id, researchers.name, researchers.job_title, sightings.species_id, sightings.habitat_id
    //                    FROM sightings
    //                    INNER JOIN researchers ON sightings.researcher_id = researcher_id`)                                                                                                    FROM sightings                                                                                                                                                                                             INNER JOIN researchers ON sightings.researcher_id = researchers.id                                                                                                                                            WHERE habitat_id = 1;

    try{
        const result = await db.any(inputQuery)
        res.json({
            status:'success',
            message:'Retrieved all sightings',
            payload: result
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Failed to retrieve sightings',
            payload: null
        })
        console.log(error)
    }
})

router.get('/species/:id', async (req, res)=> {
    const id = req.params.id
    const inputQuery = (`SELECT * FROM sightings WHERE species_id = $1`)

    try{
        const result = await db.any(inputQuery, [id])
        res.json({
            status:'success',
            message:'Retrieved single sighting',
            payload: result
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Failed to retrieve single sighting',
            payload: null
        })
        console.log(error)
    }
})

router.get('/researchers/:id', async (req, res)=> {
    const id = req.params.id
    const inputQuery = (`SELECT * FROM sightings WHERE researcher_id = $1`)

    try{
        const result = await db.any(inputQuery, [id])
        res.json({
            status:'success',
            message:'Retrieved all sightings by ',
            payload: result
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Failed to retrieve habitats',
            payload: null
        })
        console.log(error)
    }
})

router.get('/habitats/:id', async (req, res) => {
    const id = req.params.id
    const inputQuery = (`SELECT *
                         FROM sightings
                          WHERE habitat_id = $1`)

    // const inputQuery2 = (`SELECT sightings.researcher_id, researchers.name, researchers.job_title, sightings.species_id, sightings.habitat_id
    //                       FROM sightings
    //                       INNER JOIN researchers ON sightings.researcher_id = researcher_id
    //                       WHERE habitat_id = $1`)
    try{
        const result = await db.many(inputQuery, [id])
        res.json({
            status:'success',
            message:'Retrieved all habitats sightings by id ',
            payload: result
        })
    } catch (error) {
        res.json({
            status:'failed',
            message:'Failed to retrieve habitats',
            payload: null
        })
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const {speciesId, researcherId, habitatId} = req.body
    const inputQuery = (`INSERT INTO sightings(species_id, researcher_id, habitat_id) VALUES($1, $2, $3) `)

    try{
        await db.none(inputQuery, [speciesId, researcherId, habitatId])
        res.json({
            status:'success',
            message: `Added a new sighting`,
            payload: req.body
        })
    } catch(error){
        res.json({
            status: 'error',
            message: 'Failed to add a new sighting',
            payload: null
        })
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id 
    const inputQuery = (`DELETE FROM sightings WHERE id = $1`)

    try{
       const deleteUser =  await db.none(inputQuery, [id])
        res.json({
            status: 'success',
            message: `Deleted sighting ${id}`,
            payload: deleteUser
        })
    } catch(error){
        res.json({
            status: 'error',
            message:'Failed to delete sighting',
            payload: null
        })
    }
})
module.exports = router