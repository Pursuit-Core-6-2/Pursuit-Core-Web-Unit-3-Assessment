const express = require('express');
const router = express.Router();
const db = require ('../database.js')

// getting all habitats
router.get('/all' , async(req, res) =>{
    try {
    let allHabitats = await db.any(`SELECT * FROM habitats`)
    res.json({
        status: "success",
        message: "all habitats have been retrived",
        payload: allHabitats
    });
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

// retrieving single habitat
router.get('/:id', async(req, res)=>{
    let id = Number(req.params.id)
    try {
        let habitat = await db.one(`SELECT * FROM habitats WHERE id = ${id}`)
        res.json({
           status: "success",
           message: "single habitat has been retrived",
           payload: habitat
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "Something went wrong.",
            payload: null
        })
    }
})

//creates new habitat
router.post('/', async (req, res) =>{
    let insertQuery =  `INSERT INTO habitats(category)
    VALUES($1);`

    let category = req.body.category

    let body = {
       category : category
    }

    try{
        await db.none(insertQuery,[category])
        res.json({
            status : 'success',  
            message: 'habitat has been added',
            payload: body
        })
    } catch (error) {
        res.json({
            status: "error",
            message: null
        })
    }
})


module.exports = router; 