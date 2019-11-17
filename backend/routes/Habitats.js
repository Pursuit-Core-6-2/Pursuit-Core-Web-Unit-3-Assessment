const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

router.get('/', async (req, res)=> {
    const inputQuery = (`SELECT * FROM habitats`)

    try{
        const result = await db.any(inputQuery)
        res.json({
            status:'success',
            message:'Retrieved all habitats',
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

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const inputQuery = (`SELECT * FROM habitats WHERE id = $1`)

    try{
        const result = await db.one(inputQuery, [id])
        res.json({
            status:'success',
            message: 'Retrieved single habitat',
            payload: result
        })
    } catch (error){
        res.json({
            status:'error',
            message:'Failed to retrieve data',
            payload: null
        })
    }
})

router.post('/', async (req, res) => {
    const category = req.body.category
    const inputQuery = (`INSERT INTO habitats(category) VALUES($1)`)

    try{
        await db.none(inputQuery, [category])
        res.json({
            status:'success',
            message:`Added new habitat, ${category}`,
            payload: req.body
        })
    } catch(error){
        res.json({
            status:'error',
            message:'Failed to add new habitat',
            payload: null
        })
        console.log(error)
    }
})



module.exports = router