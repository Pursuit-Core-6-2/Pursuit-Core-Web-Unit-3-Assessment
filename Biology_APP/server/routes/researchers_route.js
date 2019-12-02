//routing
const express = require('express');
const router = express.Router();
const db = require("../Database/database")



//get all researchers
router.get("/", (req,res)=>{
    db.any("SELECT * FROM researchers")
    .then(function(data){
        const response = {
            researchers: data
        }
        // res.send(response)
        res.json({
            payload: response,
            message: "get all users"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})


//get one researcher
router.get("/:id",(req,res)=>{
    db.one(`SELECT name, job_title  FROM researchers Where id = $1 `,[req.params.id])
    .then(function(data){
        const response = {
            researchers: data
        }
        
        res.json({
            payload: response,
            message: "get one user"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})

//post one researcher
router.post('/', async (req,res)=>{
    let insert = `
    INSERT INTO researchers(name,job_title)
    VALUES ($1,$2)`

    try{
        await db.none(insert,[req.body.name,req.body.job_title])
        res.json({
            payload: req.body,
            message:"Post recieved"
        })
    }catch(error){
        res.status(500)
        res.json({
            message: "you messed up"
        })
    }
})


//patch researcher
router.patch("/:id",async(req,res)=>{
    
        try {
            let data;
            if (req.body.name && req.body.job_title) {
                data = await db.one(
                    `UPDATE researchers SET name = $/name/, job_title = $/job_title/ WHERE id = $/id/ RETURNING *`, 
                    {id: req.params.id, name: req.body.name, job_title: req.body.job_title}
                )
                
            } else if (req.body.job_title) {
                data = await db.one(
                    `UPDATE researchers SET job_title = $/job_title/ WHERE id = $/id/ RETURNING *`, 
                    {id: req.params.id, job_title: req.body.job_title}
                )
            } else {
                data = await db.one(
                    `UPDATE researchers SET name = $/name/ WHERE id = $/id/RETURNING *`, 
                    {id: req.params.id, name: req.body.name}
                )
            }
            
            res.status(200)
            res.json({
                status: 'success',
                message: 'Researcher updated',
                payload: data
            });
    
        } catch (err) {
            res.status(400)
            res.json({
                status: err,
                message: "you messed up",
                payload: null
            });
        }
})

router.delete("/:id",async (req,res)=>{
    let id = req.params
    try{
        id = Number(id);
        const data = await db.one(
            `DELETE FROM researchers WHERE id = $/id/`, {id}
        )
        res.status(200).json({
            message:"Deleted A Researcher",
            payload: data
        })

    }catch(err){
        res.status(404).json({
            message: "you messed up",
            payload: null
        })

    }
    
})


module.exports = router;