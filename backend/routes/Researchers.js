const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

router.get('/', async (req, res)=> {
    const inputQuery = (`SELECT * FROM researchers`)

    try{
       const result = await db.any(inputQuery)
       res.json({
           status: 'success',
           message: 'Retrieved researchers',
           payload: result
       })
    } catch (error){
        res.json({
            status: 'error',
            message: 'Researchers not found',
            payload: null
        })
        console.log(error)
    }
    
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const inputQuery = (`SELECT * FROM researchers WHERE id = $1`)

    try{
        const result = await db.one(inputQuery, [id])
        res.json({
            status: 'success',
            message: 'Retrieved single researcher',
            payload: result
        })
    } catch (error){
        res.json({
            status: 'error',
            message: 'Researcher not found',
            payload: null
        })
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const {name, jobTitle} = req.body
    const inputQuery = (`INSERT INTO researchers(name, job_title) VALUES($1, $2)`)

    try{
        await db.none(inputQuery, [name, jobTitle])
        res.json({
            status: 'success',
            message: `Added ${name}, the ${jobTitle}`,
            payload: req.body
        })
    } catch(error) {
        res.json({
            status: 'error',
            message: 'Failed to add new researcher',
            payload: null
        })
       console.log(error)
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, jobTitle} = req.body
    const inputQuery = (`UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3 `)

    try{
        await db.none(inputQuery, [name, jobTitle, id])
        res.json({
            status:'success',
            message:'Updated researcher info',
            payload: req.body
        })
    } catch(error){
        res.json({
            status: 'error',
            message: 'Failed to update researcher',
            payload: null
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const inputQuery = (`DELETE FROM researchers WHERE id = $1`)

    try{
        const deleteUser = await db.none(inputQuery, [id])
        res.json({
            status: 'success',
            message: `Deleted researcher ${id}`,
            payload: deleteUser
        })
    } catch(error){
        res.json({
            status: 'error',
            message:'Failed to delete researcher',
            payload: null
        })
    }
})

module.exports = router