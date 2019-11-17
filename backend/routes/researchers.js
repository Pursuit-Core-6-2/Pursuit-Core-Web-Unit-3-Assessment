const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/all', async (req, res) => {

    try {
        let researchers = await db.any('SELECT * FROM researchers')
        res.json({
            status: "success",
            message: "retrieved all researchers", 
            payload: researchers

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "researchers not found",
            payload: null
        })
    }
})

router.get('/:id', async (req, res) => {
        let id = req.params.id
    try {
        let singleResearcher = 'SELECT * FROM researchers WHERE id = $1'
        let result = await db.any(singleResearcher, [id])
        res.json({
            status: "success",
            message: "retrieved single researchers", 
            payload: result

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "researcher not found",
            payload: null
        })
    }
})

router.post('/register', async(req, res) => {
    try {
        let insertResearcher = `INSERT INTO researchers (full_name, job_title)
        VALUES($1, $2)`

        await db.none(insertResearcher, [req.body.full_name, req.body.job_title])
        
        res.json({
            status: "success",
            message: "added researcher",
            payload: req.body
            
        })
    }catch (error){
        res.json({
            status: "error",
            message: "researcher not added",
            payload: null
        })
    }
})

router.delete('/delete', async (req, res)=>{
    let researcher_id = req.body.id;
    
    let deleteQUERY = await db.none(`DELETE FROM reasearcher WHERE id = $1`, [researcher_id]);
    try{
        let deleteResearcher = ([reasearcher_id])
        res.json(
            {
                status: "success",
                message: "researcher removed",
                payload: deleteResearher
            })
        }
    catch (error){
        message: "Was unable to Delete researcher!"
    }
    })


module.exports = router;