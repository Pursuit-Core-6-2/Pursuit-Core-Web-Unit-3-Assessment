const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

router.get('/', async (req, res)=> {
    const inputQuery = (`SELECT * FROM animals`)
    try{
        const result = await db.any(inputQuery)
        res.json({
            status:'success',
            message:'Success retrieved all animals',
            payload: result
        })
    } catch (error) {
        res.json({
            status: 'error',
            message:'Could not retrieve all animals',
            payload: null
        })
        console.log(error)
    }
})

router.get('/:id', async (req, res)=> {
    const id = req.params.id
    const inputQuery = ('SELECT * FROM animals WHERE id = $1')

    try{
        const result = await db.one(inputQuery, [id])
        res.json({
            status:'success',
            message:'Retrieved single animal',
            payload: result
        })
    } catch (error){
        res.json({
            status: 'error',
            message:'Could not retrieve all animals',
            payload: null
        })
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const {speciesId, nickname} = req.body
    const inputQuery = (`INSERT INTO species(species_id, nickname) VALUES($1, $2)`)

    try {
        await db.none(inputQuery, [speciesId, nickname])
        res.json({
            status: 'success',
            message: `Added ${nickname} id: ${speciesId}`,
            payload: req.body
        })
    } catch(error){
        res.json({
            status: 'error',
            message:'Could not add new animal',
            payload: null
        })
        console.log(error)
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {speciesId, nickname} = req.body
    const inputQuery = ('UPDATE animals SET species_id = $1, nickname = $2 WHERE id= $3')
    
    try{
        await db.none(inputQuery, [speciesId, nickname])
        res.json({
            status:'success',
            message:'Updated animal info',
            payload: req.body
        })
    } catch(error){
        res.json({
            status:'error',
            message: 'Failed to update animal',
            payload: null
        })
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const inputQuery = (`DELETE FROM animals WHERE id = $1`)

    try{
        deleteUser = await db.none(inputQuery, [id])
        res,json({
            status: 'error',
            message: 'Deleted animal',
            payload: deleteUser
        })
    } catch(error){
        res.json({
            status:'error',
            message: 'Failed to delete animal',
            payload: null
        })
        console.log(error)
    }
})





module.exports = router