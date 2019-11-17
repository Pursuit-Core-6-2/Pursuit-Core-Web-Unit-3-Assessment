const express = require('express');
const router = express.Router();
const db = require ('../database.js')

//retrieving all researchers
router.get('/all' , async(req, res) =>{
    try {
    let allResearchers = await db.any(`SELECT * FROM researchers`)
    res.json({
        status: "success",
        message: "all researchers have been retrived",
        payload: allResearchers
    });
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

//retrieving one researcher by id
router.get('/:id', async(req, res)=>{
    let id = Number(req.params.id)
    try {
        let researcher = await db.one(`SELECT * FROM researchers WHERE id = ${id}`)
        res.json({
          status:"success",
          message: "retrieved single researcher",
          payload:researcher
        })
    } catch (error) {
        res.json({
            status: "error",
            message: "researcher not found.",
            payload: null
        })
    }
})

//creating new researcher
router.post('/', async (req, res)=>{
    let insertQuery =  `INSERT INTO researchers(name, job_title)
    VALUES($1, $2);`

    let name = req.body.name
    let job_title = req.body.job_title

    let body = {
        name : name,
        job_title: job_title
    }

    try{
        await db.none(insertQuery,[name, job_title])
        res.json({
            status : 'success',  
            message: 'Researcher has been added',
            payload: body
        })
    } catch (error) {
        res.json({
            status: "error",
            message: null
        })
    }
})

//updates researcher information
router.patch('/:id', async(req, res) =>{
    let id = Number(req.params.id)
    let name = req.body.name
    let job_title = req.body.job_title

    let updateQuery =  `UPDATE researchers 
    SET name = $1, job_title = $2 
    WHERE id = $3;`
   
   

    let body = {
        name : name,
        job_title: job_title
    }

    try{
        await db.any(updateQuery,[name, job_title, id])
        res.json({
            status : 'success',  
            message: 'Researcher has been updated',
            payload: body
        })
    } catch (error) {
        res.json({
            status: "error",
            message: null
        })
    }
})


//deletes researcher
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deletedResearcher = await db.none(`DELETE FROM researchers WHERE id = ${id}`)
        res.json({
            status: "Success",
            message: `Researcher ${id} was deleted`,
            payload: deletedResearcher


        })
    } catch (error){
        res.json({
            status: 'error',
            message: null
        })
    }
})

module.exports = router ;