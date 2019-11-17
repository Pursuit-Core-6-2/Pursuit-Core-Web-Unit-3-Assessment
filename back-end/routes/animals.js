const express = require('express')
const router = express.Router()
const db = require('./db')

//Gets all animals 
router.get('', async (req,res) =>{ 
    try{
        const animals = await db.any('select * from animals');
        res.json({
            status : 'success',
            message : 'retrieved all animals',
            payload : {
                animals: animals
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'animals not found',
            payload: null
        })
    }
})

//Gets a single animal using req param 
router.get('/:id', async (req,res) =>{ 
    try{
        const id = req.params.id
        const animal = await db.one(`select * from animals where id = ${id}`);
        res.json({
            status : 'success',
            message : 'retrieved single animal',
            payload : {
                animal : animal
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'animal not found',
            payload: null
        })
    }
})

//Adds a new animal
router.post('', async (req,res) =>{ 
    try{
        const species_id = Number(req.body.species_id)
        const name = req.body.name
        const insert_query = 
        `INSERT into animals(species_id, nickname) VALUES
        ($1, $2)`

        if(!name && !species_id){
            res.json({
                status : 'error',
                message: "information missing"
            })
        } else {
            await db.none(insert_query, [species_id, name]); 
            res.json({
                status : 'success',
                message : `added animal ${name}`,
            })  
        }
    }catch(err){
        res.json({
            status : 'error',
            message: 'animal not added',
        })
    }
})

//Updates an existing animal
router.patch('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const species_id = Number(req.body.species_id)
        const name = req.body.name

        if(!name && !species_id){
            res.json({
                status : 'error',
                message : 'missing info'
            })
        }else if(name && species_id){
            res.json({
                status : 'error',
                message : 'you can only updtate one value at a time'
            })
        }else if(name){
            await db.none( `UPDATE animals SET nickname = '${name}' WHERE id =${id}`)
            res.json({
                status : 'success',
                message : `updated animal with id ${id}`
            })
        }else if(species_id){
            await db.none( `UPDATE animals SET  species_id = '${species_id}' WHERE id =${id}`)
            res.json({
                status : 'success',
                message : `updated animal with id ${id}`
            })
        }
    }catch(error){
        console.log(error)
        res.send({
            status: 'error',
            message: 'could not update animal',
            payload: null
         })
    }
})

//Deletes an existing animal
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await db.none(`delete from animals where id = ${id}`);
        
        res.json({
            status: "success",
            message: "deleted animal",
        })
    }catch (error) {        
        res.json({
            status : 'error',
            message: 'could not delete researcher'
        })
    }
})

//Export
module.exports = router