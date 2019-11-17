const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

router.get('/', async (req, res)=> {
    const inputQuery = (`SELECT * FROM species`)

    try{
        const result = await db.any(inputQuery)
        res.json({
            status: 'success',
            message: 'All animal species received',
            payload: result
        })
    } catch (error){
        res.json({
            status:'error',
            message: 'Had a problem retrieving species',
            payload: null
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const inputQuery = (`SELECT * FROM species WHERE id = $1`)
    try{
        const result = await db.one(inputQuery, [id])
        res.json({
            status: 'success',
            message: 'All animal species received',
            payload: result
        })
    } catch (error){
        res.json({
            status: 'error',
            message: 'Couldnt get single animal species',
            payload: null
        })
    }
})

router.post('/', async (req, res) => {
    const { name, isMammal} = req.body
    const inputQuery = (`INSERT INTO species(name, is_mammal) VALUES ($1, $2)`)

    try {
        await db.none(inputQuery, [name, isMammal])
        res.json({
            status: 'success',
            message: `Added ${name}, Mammal status: ${isMammal}`,
            payload: req.body
        })
    } catch(error){
        res.json({
            status: 'error',
            message: 'Failed to add a new species',
            payload: null
        })
        console.log(error)
    }
})
module.exports = router