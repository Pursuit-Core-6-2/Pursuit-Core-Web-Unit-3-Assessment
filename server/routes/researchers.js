const express = require('express');

const router = express.Router();

const db = require('./database');


// GET /researchers: Get all researchers.
router.get('/', async (req, res) => {
    try {
        let researchers = await db.any("SELECT * FROM researchers")
        res.status(200)
        res.json({
            payload: researchers,
            message: "Success. Retrieved all the researchers."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// GET /researchers/:id: Get single researcher.
router.get('/:id', async (req, res) => {
    let id = req.params.id 
    try {
        let researchers = await db.one("SELECT * FROM researchers WHERE id = $1", [id])
        res.status(200)
        res.json({
            payload: researchers,
            message: `Success. Retrieved researcher with id ${id}`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
}) 


// POST /researchers: Add new researcher.
router.post('/', async (req, res) => {
    let name = req.body.name
    let isMammal = req.body.jobtitle  
    try {
        let researcher = await db.any("INSERT INTO researchers (name, job_title) VALUES ($1, $2) RETURNING *", [name, jobTitle])
        res.status(200)
        res.json({
            payload: researcher,
            message: `Success. Inserted ${jobTitle}, ${name} into researchers table.`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// PATCH /researchers/:id: Update single researcher.
router.patch('/:id', async (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let jobTitle = req.body.jobtitle  
    try {
        let researcher = await db.any("UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3 RETURNING *", [name, jobTitle, id]) // changed from 'none' to 'any' because I'm returning all rows updated
        res.status(200)
        res.json({
            payload: researcher,
            message: `Success. Updated ${jobTitle} and ${name} in researchers table.`
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


// DELETE /researchers/:id: Delete single researcher.
router.delete('/:id', async (req, res) => {
    let id = req.params.id 
        try {
            let researcher = await db.any("DELETE FROM researchers WHERE id = $1 RETURNING *", [id])
            res.status(200)
            res.json({
                payload: researcher,
                message: `Success. Deleted researcher with id ${id}`
            });
        } catch (error) {
            res.status(500)
            res.json({
                message: "Error. Something went wrong!"
            })
            console.log(error)
    }
})

module.exports = router; 