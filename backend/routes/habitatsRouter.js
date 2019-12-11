const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')
//////////////////////////////////////////////

//ROUTE TO GET ALL HABITATS
router.get('/', async(req, res) => {
    try{
        const requestQuery = `SELECT * FROM habitats`;

        let allHabitats = await db.any(requestQuery)
        res.status(200)
        res.json({
            data: allHabitats,
            status: 'success',
            message: 'The data was successfully retrieved!!!'

        })

    } catch (error) {
        res.status(400)
        res.json({
            message: `An error occured cannot retrieve data`
        })
    }
})
//////////////////////////////////////////////////////////

//ROUTE TO GET A SINGLE HABITAT USING ITS ID
router.get('/:id', async (req, res) => {
    const habitatId = req.params.id
    
    try {
        const requestQuery = `SELECT * FROM habitats WHERE id=$1`;

        let habitats = await db.any(requestQuery, [habitatId])
        res.status(200)
        res.json({
            data: habitats,
            status: 'success',
            message: 'The habitat was successfully retrieved!!!'

        })

    } catch (error) {
        res.status(400)
        res.json({
            message: `An error occured cannot retrieve habitat`
        })
    }
})
////////////////////////////////////////////////////////

//ROUTE TO ADD A NEW HABITAT
router.post('/', async(req, res) => {

    try {  
        const insertQuery = `INSERT INTO habitats(category)
                                values($1)`
        
        await db.none(insertQuery, [req.body.category])
        const data = {
            category: req.body.category
        }
        res.status(201)
        res.json({
            habitat: data,
            status: 'success',
            message:`The habitat has been added to the data`
        })
    } catch (error) {
        res.status(400)
        res.json({
            message: `The habitat coundn't be added to the data`
        })

    }
})









module.exports = router;