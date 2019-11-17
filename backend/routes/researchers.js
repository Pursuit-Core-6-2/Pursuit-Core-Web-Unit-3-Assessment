const express = require('express');
const router = express.Router();
//const researcher = require("./researcher.js");
const { db } = require('../database/index.js');


// retrieving all researchers
router.get('/',  async (req,res)=>{
    try {
        let researchers = await db.any("SELECT * FROM researchers")
        res.json({
            payload: researchers,
            message: 'Success. Retrieved all researchers.'
        })
    } catch (error) {
        console.log(error)
        res.status(404)
        res.json({
            message: "Error. No researchers found."
        })
    }
})


// retrieving researcher by id
router.get('/:id', async(req, res)=>{
    let id = Number(req.params.id)
    try {
        let researcher = await db.one(`SELECT * FROM researchers WHERE res_id = ${id}`)
        res.json({
            payload : researcher,
            message : `Success. Retrieved researcher with id: ${id}`
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Something went wrong."
        })
    }
})

// adding a new researcher 
router.post('/register', async (req, res)=>{
    let insertQuery =  `INSERT INTO researchers(name, job_title)
    VALUES($1, $2);`

    let name = req.body.name
    let job_title = req.body.job_title

    let body = {
        name: name,
        job_title: job_title
    }

    try{
        await db.none(insertQuery,[name, job_title])
        res.json({
            status : 'success',  
            message: 'Researcher added',
            body: body
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: error.detail
        })
    }
})

//reassigning researcher
router.delete('/:id', async(req, res) =>{
let id = Number(req.params.id);
console.log(id)
try{
    let removedResearcher =  await db.none(`DELETE FROM researchers WHERE res_id = ${id}`)
    res.json({
        message: `Success! researcher ${id} has been removed.`
    })
} catch (error) {
    console.log(error)
    res.json({
        message: `Unable to remove researcher.`
    })
}
})


module.exports = router;