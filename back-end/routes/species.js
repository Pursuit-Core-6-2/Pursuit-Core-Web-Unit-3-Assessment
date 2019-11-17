const express = require('express')
const router = express.Router()
const db = require('./db')

//Gets all species
router.get('', async (req,res) =>{ 
    try{
        const species = await db.any('select * from species');
        res.json({
            status : 'success',
            message : 'retrieved all species',
            payload : {
                species: species
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'species not found',
            payload: null
        })
    }
})

//Gets a single species
router.get('/:id', async (req,res) =>{ 
    try{
        const id = req.params.id
        const species = await db.one(`select * from species where id = ${id}`);
        res.json({
            status : 'success',
            message : 'retrieved single species',
            payload : {
                species: species
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'species not found',
            payload: null
        })
    }
})

//Adds a new species
router.post('', async (req,res) =>{ 
    try{
        const name = req.body.name
        const is_mammal = req.body.is_mammal
        const insert_query = 
        `INSERT into species(species_name, is_mammal) VALUES
        ($1, $2)`

        if(!name && !is_mammal){
            res.json({
                status : 'error',
                message: "information missing"
            })
        }else{
            await db.none(insert_query, [name, is_mammal]);  
            res.json({
                status : 'success',
                message : `added species ${name}`,
    
            }) 
        }
    }catch(err){
        console.log(err);
        res.json({
            status : 'error',
            message: 'species not added',
            tip : 'is_mammal data type should be boolean only',
            payload: null
        })
    }
})


//Export
module.exports = router