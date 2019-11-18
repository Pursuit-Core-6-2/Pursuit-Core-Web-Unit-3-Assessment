const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('', async(req, res) => {
    try{
        let researchers = await db.any('SELECT * FROM researchers');
        res.json({
            "status": "success",
            "message": "retrieved reseachers",
            "payload": researchers,
        })
    }catch(error){
        console.log(error)
        res.json({
            
            "message": error
        })
    }
})

router.get('/:id', async(req, res) => {
    try{
        let researcherID = req.params.id
        let getResearcher = await db.one(`SELECT * FROM researchers WHERE id = ${researcherID}`);
        res.json({
            "status": "success",                      
            "message": "retrieved single researcher", 
            "payload": {  getResearcher }
        })
        }catch(error){
            res.json({
                "status": "error",
                "message": "researcher not found",
                "payload": null
            })
        }
})

router.post('', async(req, res) => {
    try{
        let name = req.body.name;
        let job_title = req.body.job_title;
        let insertQuery = `INSERT into researchers(name, job_title) VALUES ($1, $2)`;

        if(!name || ! job_title){
            res.json({
                "message": "Information Missing"
            })
        }else{
            await db.none(insertQuery, [name, job_title]);
            res.json({
                user: name,
                job: job_title,
                "message": "posted"
            })
        }
    }catch(error){
        console.log(error)
        res.json({
            "message": error
        })
    }
})

router.patch('/:id', async(req, res) =>{
    let id = req.params.id
    let name = req.body.name
    let job_title = req.body.job_title
    try{
        await db.any(`UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3 RETURNING *`, [name, job_title, id])
        res.json({
            "message": "updated post",
            "payload": { 
                id: id,
                name: name,
                job_title: job_title
            }
        })
    }catch(error){
        console.log(error)
        res.json({
            'message': error
        })
    }
})

router.delete('/:id', async(req, res) => {
    try{
        let deleteResearcher = await db.none(`DELETE FROM researchers WHERE id = ${req.params.id}`)
        res.json({
            "message": "deleted researcher",
            // "payload": {deleteResearcher}
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})

module.exports = router