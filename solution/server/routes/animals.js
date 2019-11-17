const express = require('express');
const router = express.Router();
const db = require('./pgp.js')

router.get('/', async (req, res) => {
    try {
        let animals = await db.any('SELECT * FROM animals');
        res.json({
            status: 'Success',
            message: 'Retrieved all animals',
            payload: animals,
        })
    }
    catch (error){
        res.json({
            status: 'Error',
            message: 'Could not load animals.',
            payload: null,
        });
    }
});
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let animal = await db.one('SELECT * FROM animals WHERE id = $1', id);
        res.json({
            status: 'Success',
            message: 'Animal retrieved',
            payload: animal
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load animal.',
            payload: null,
        });
    }
});
router.post('/', async (req, res) => {
    let newAnimal = req.body;
    try {
        let insertQuery = `INSERT INTO animals(species_id, nickname)
            VALUES($1, $2)`
        await db.none(insertQuery, [newAnimal.species_id, newAnimal.nickname]);
        res.json({
            status: 'Success',
            message: "New Animal created",
            payload: newAnimal
        })
    }
    catch (error) {
        res.json({
            status: 'Error',
            message: 'Error posting new animal',
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
    let animalId = Number(req.params.id);
    try {
        let deleteQuery = `DELETE FROM animals
                    WHERE id = $1`;
        await db.none(deleteQuery, animalId);
        res.json({
            status: 'Success',
            message: 'Animal was deleted from database',
        })
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Animal could not be deleted',
            payload: null
        });
        };
});
module.exports = router;
