const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('', async (req, res) => {
    try{
        let species = await db.any('SELECT * FROM species')
        res.json({
            "status": "success",
            "message": "retrieved species",
            "payload": species
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})

router.get('/:id', async(req, res) => {
    try{
        let singleSpecies = req.params.id
        let getSpecies = await db.one(`SELECT * FROM species WHERE id = ${singleSpecies}`)
        res.json({
            "status": "success",
            "message": "retrieved single species",
            "payload": { getSpecies}
        })
    }catch(error){
        console.log(error)
        res.json({
            "status": "error",
            "message": "species not found",
            "payload": null
        })
    }
})

router.post('', async(req, res) => {
    try{
        let name = req.body.name;
        let is_mammal = req.body.is_mammal;
        let insertQuery = `INSERT into species(name, is_mammal)VALUES($1,$2)`
        
        if(!name || !is_mammal){
            res.json({
                "message": "Information Missing"
            })
        }else{
            await db.none(insertQuery, [name, is_mammal]);
            res.json({
                "name": name,
                "is_mammal": is_mammal,
                "message": "posted"
            })
        }
    }catch(error){
        res.json({
            "message": error
        })
    }
})


module.exports = router;