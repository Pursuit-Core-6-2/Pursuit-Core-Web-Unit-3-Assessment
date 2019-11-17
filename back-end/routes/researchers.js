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
            payload: null
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
                researcher : researcher
            }
        })
    }catch(err){
        res.json({
            status : 'error',
            message: 'researcher not found',
            payload: null
        })
    }
})

//Add a new researcher
router.post('', async (req,res) =>{ 
    try{
        const name = req.body.name
        const job = req.body.job
        const insert_query = 
        `INSERT into researchers(full_name, job_title) VALUES
        ($1, $2)`

        if(!name && !job){
            res.json({
                status : 'error',
                message: "information missing"
            })
        }else{
            await db.none(insert_query, [name, job]); 
            res.json({
                status : 'success',
                message : 'added single researcher',
            })  
        }
    }catch(err){
        console.log(err);
        res.json({
            status : 'error',
            message: 'researcher not added',
            payload: null
        })
    }
})

//Update a reseaercher
router.patch('/:id', async (req, res) => {
    try{
        let id = req.params.id
        let name = req.body.name
        let job_title = req.body.job
        if(!name && !job_title){
            res.json({
                status : 'error',
                message : 'missing info'
            })
        }else if(name && job_title){
            res.json({
                status : 'error',
                message : 'you can only updtate one value at a time'
            })
        }else if(name){
            await db.none( `UPDATE researchers SET full_name = '${name}' WHERE id =${id}`)
            res.json({
                status : 'success',
                message : `updated researcher with id ${id}`
            })
        }else if(job_title){
            await db.none( `UPDATE researchers SET  job_title = '${job_title}' WHERE id =${id}`)
            res.json({
                status : 'success',
                message : `updated researcher with id ${id}`
            })
        }
    }catch(error){
        console.log(error)
        res.send({
            status: 'error',
            message: 'could not update user',
            payload: null
         })
    }
})

//Delete a researcher
router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        await db.none(`delete from researchers where id = ${id}`);
        
        res.json({
            status: "success",
            message: "deleted researcher",
        })
    }catch (error) {
        console.log(error);
        
        res.json({
            status : 'error',
            message: 'could not delete researcher'
        })
    }
})

//Export
module.exports = router