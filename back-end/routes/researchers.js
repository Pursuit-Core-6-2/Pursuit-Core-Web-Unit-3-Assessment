const express = require('express')
const router = express.Router()
const db = require('./db')

//Gets all researchers 
router.get('', async (req,res) =>{ 
    try{
        const research_team = await db.any('select * from researchers');
        res.json({
            status : 'success',
            message : 'retrieved entire research team',
            payload : {
                researchers: research_team
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'research team not found',
            payload: err
        })
    }
})

//Gets a single researcher using req param 
router.get('/:id', async (req,res) =>{ 
    try{
        const id = req.params.id
        const researcher = await db.any(`select * from researchers where id = ${id}`);
        res.json({
            status : 'success',
            message : 'retrieved single researcher',
            payload : {
                'researcher': researcher
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'researcher team not found',
            payload: err
        })
    }
})

//Add a new researcher
router.post('', async (req,res) =>{ 
    try{
        const name = req.body.name
        const insert_query = 
        `INSERT into researchers(full_name, job_title) VALUES
        ($1, $2)`
        res.json({
            status : 'success',
            message : 'added single researcher',
            payload : {
                'researcher': researcher
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'researcher team not found',
            payload: err
        })
    }
})



//Export
module.exports = router