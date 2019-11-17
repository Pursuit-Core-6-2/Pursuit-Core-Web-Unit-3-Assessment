const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/all', async (req, res) => {

    try {
        let habitats = await db.any('SELECT * FROM habitats')
        res.json({
            status: "success",
            message: "retrieved all habitats", 
            payload: habitats

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "habitats not found",
            payload: null
        })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
try {
    let singlehabitats = 'SELECT * FROM habitats WHERE id = $1'
    let result = await db.any(singleHabitats, [id])
    res.json({
        status: "success",
        message: "retrieved single habitats", 
        payload: result

    })
} catch (error) {
    console.log(error)
    res.json({
        status: "error",
        message: "single habitats not found",
        payload: null
    })
}
})


router.post('/register', async(req, res) => {
    try {
        let insertHabitats = `INSERT INTO habitats (category)
        VALUES($1)`

        await db.none(insertHabitats, [req.body.category])
        
        res.json({
            status: "success",
            message: "added habitat",
            payload: req.body
            
        })
    }catch (error){
        res.json({
            status: "error",
            message: "habitat not added",
            payload: null
        })
    }
})




















module.exports = router;