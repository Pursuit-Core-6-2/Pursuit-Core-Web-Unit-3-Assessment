const express = require('express');
const router = express.Router();
const db = require('./pgp.js')

router.get('/', async (req, res) => {
    try {
        let researchers = await db.any('SELECT * FROM researchers');
        res.json({
            status: 'Success',
            message: 'Retrieved all researchers',
            payload: researchers,
        })
    }
    catch (error){
        res.json({
            status: 'Error',
            message: 'Could not load researchers.',
            payload: null,
        });
    }
});
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let researcher = await db.one('SELECT * FROM researchers WHERE id = $1', id);
        res.json({
            status: 'Success',
            message: 'Researcher retrieved',
            payload: researcher
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
    let newResearcher = req.body;
    try {
        let insertQuery = `INSERT INTO researchers(r_name, job_title)
            VALUES($1, $2)`
        await db.none(insertQuery, [newResearcher.r_name, newResearcher.job_title]);
        res.json({
            status: 'Success',
            message: "Researcher information sent",
            payload: newResearcher
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
                SET r_name = $1, job_title = $2
                WHERE id = $3`
        await db.none(updateQuery, [newInfo.r_name, newInfo.job_title, researcherId]);
        res.json({
            status: 'Success',
            message: 'User was successfully updated',
            payload: newInfo
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
router.delete('/:id', async (req, res) => {
    let researcherId = Number(req.params.id);
    try {
        let deleteQuery = `DELETE FROM researchers
                    WHERE id = $1`;
        let deletedUser = await db.none(deleteQuery, researcherId);
        res.json({
            status: 'Success',
            message: 'User was deleted from database',
            payload: deletedUser
        })
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'User could not be deleted',
            payload: null
        });
        };
});
module.exports = router;