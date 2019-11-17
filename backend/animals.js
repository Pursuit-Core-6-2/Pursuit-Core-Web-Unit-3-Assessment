const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('', async (req, res) => {
    try{
        let animals = await db.any(`SELECT * FROM animals`)
        res.json({
            "status": "success",
            "message": "retrieved animals",
            "payload": animals
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})

router.get('/:id', async(req, res) => {
    try{
        let singleAnimal = req.params.id
        let getAnimal = await db.one(`SELECT * FROM animals WHERE id = ${singleAnimal}`);
        res.json({
            "status": "success",
            "message": "retrieved single species",
            "payload": { getAnimal}
        })
    }catch(error){
        console.log(error)
        res.json({
            "status": "error",
            "message": "animal not found",
            "payload": null
        })
    }
})

router.post('', async(req, res) => {
    try{
        let species_id = req.body.species_id;
        let nickname = req.body.nickname;
        let insertQuery = `INSERT into animals(species_id, nickname)VALUES($1,$2)`

        if(!species_id || !nickname){
            res.json({
                "message": "Information Missing"
            })
        }else{
            await db.none(insertQuery, [species_id, nickname]);
            res.json({
                "species_id": species_id,
                "nickname": nickname,
                "message": "posted"
            })
        }
    }catch(error){
        res.json({
            "message": error
        })
    }
})

router.patch('/:id', async(req, res) => {
    let species_id = req.body.species_id;
    let nickname = req.body.nickname
    try{
        await db.one(`UPDATE animals SET species_id = $1, nickname = $2 WHERE id = ${req.params.id} RETURNING *`, [species_id, nickname]);
        res.json({
            "message": "updated post"
        })
    }catch(error){
        console.log(error)
        res.json({
            "message": error
        })
    }
})

router.delete('/:id', async(req, res) => {
    try{
        let deleteAnimal = await db.none(`DELETE FROM animals WHERE id = ${req.params.id}`)
        res.json({
            "message": "deleted animal",
            "payload": deleteAnimal
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})


module.exports = router;