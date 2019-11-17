const express = require('express');
const router = express.Router();
const db = require('./pgp.js')

router.get('/', async (req, res) => {
    try {
        let species = await db.any('SELECT * FROM species');
        res.json({
            status: 'Success',
            message: 'Retrieved all species',
            payload: species,
        })
    }
    catch (error){
        res.json({
            status: 'Error',
            message: 'Could not load species.',
            payload: null,
        });
    }
});
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let species = await db.one('SELECT * FROM species WHERE id = $1', id);
        res.json({
            status: 'Success',
            message: 'Species retrieved',
            payload: species
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load researcher.',
            payload: null,
        });
    }
});
router.post('/', async (req, res) => {
    let newSpecies = req.body;
    try {
        let insertQuery = `INSERT INTO species(s_name, is_mammal)
            VALUES($1, $2)`
        await db.none(insertQuery, [newSpecies.s_name, newSpecies.is_mammal]);
        res.json({
            status: 'Success',
            message: "Species information sent",
            payload: newSpecies
        })
    }
    catch (error) {
        res.json({
            status: 'Error',
            message: 'Error posting new researcher',
            payload: null
        });
    }
});
router.patch('/:id', async (req, res) => {
    let newInfo = req.body;
    let researcherId = Number(req.params.id);
    try {
        let updateQuery = `UPDATE researchers 
                SET s_name = $1, is_mammal = $2
                WHERE id = $3`
        let updatedObj = await db.one(updateQuery, [newInfo.r_name, newInfo.job_title, researcherId]);
        res.json({
            status: 'Success',
            message: 'User was successfully updated',
            payload: updatedObj
        })
    }
    catch (error) {
        console.log(error)
        res.json({
            status: 'Error',
            message: 'User could not be updated',
            payload: null
        })
    }
});

module.exports = router;