const express = require('express')
const router =express.Router()
const db = require('./db')

router.get('', async (req, res) => {
    try{
        let habitat = await db.any(`SELECT * FROM habitats`)
        res.json({
            "status": "success",
            "message": "retrieved",
            "payload": habitat
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})

router.get('/:id', async(req, res) => {
    try{
        let singleHabitat = req.params.id
        let getHabitat = await db.one(`SELECT * FROM habitats WHERE id = ${singleHabitat}`);
        res.json({
            "status": "success",
            "message": "retrieved single species",
            "payload": { getHabitat}
        })
    }catch(error){
        console.log(error)
        res.json({
            "status": "error",
            "message": "habitat not found",
            "payload": null
        })
    }
})

router.post('', async(req, res) => {
    try{
        let category = req.body.species_id;
        let insertQuery = `INSERT into habitats(category)VALUES($1)`

        if(!category){
            res.json({
                "message": "Information Missing"
            })
        }else{
            await db.none(insertQuery, [category]);
            res.json({
                "status":"success",
                "message": "posted"
            })
        }
    }catch(error){
        res.json({
            "message": error
        })
    }
})







module.exports = router