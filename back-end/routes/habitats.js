const express = require('express')
const router = express.Router()
const db = require('./db')

//Export
module.exports = router

//Gets all habitats
router.get('', async (req,res) =>{ 
    try{
        const habitats = await db.any('select * from habitats');
        res.json({
            status : 'success',
            message : 'retrieved all habitats',
            payload : {
                habitats: habitats
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'habitats not found',
            payload: null
        })
    }
})

//Gets a single habitat
router.get('/:id', async (req,res) =>{ 
    try{
        const id = req.params.id
        const habitat = await db.one(`select * from habitats where id = ${id}`);
        res.json({
            status : 'success',
            message : 'retrieved single habitat',
            payload : {
                habitat: habitat
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'habitat not found',
            payload: null
        })
    }
})

//Adds a new habitat
router.post('', async (req,res) =>{ 
    try{
        const category = req.body.category
        const insert_query = 
        `INSERT into habitats(category) VALUES
        ($1)`

        if(!category){
            res.json({
                status : 'error',
                message: "information missing"
            })
        }else{
            await db.none(insert_query, [category]);  
            res.json({
                status : 'success',
                message : `added habitat ${category}`,
    
            }) 
        }
    }catch(err){
        console.log(err);
        res.json({
            status : 'error',
            message: `habitat ${category} not added`,
            payload: null
        })
    }
})