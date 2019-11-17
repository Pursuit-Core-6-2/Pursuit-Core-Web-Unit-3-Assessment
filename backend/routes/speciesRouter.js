const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')

router.post('/', async(req, res) => {
    try {
        const insertQuery = `INSERT INTO species(name, is_mammal) VALUES($1, $2)`
        await db.one(insertQuery, [req.body.name, req.body.is_mammal])
        console.log(req.body.name)
            res.json({
                status: 'success',
                name: req.body.name,
                is_mammal: req.body.is_mammal
            })
    } catch  (error) {
        console.log('error')

    }
})


module.exports = router;