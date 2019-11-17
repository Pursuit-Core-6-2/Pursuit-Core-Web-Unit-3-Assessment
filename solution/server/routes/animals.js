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

module.exports = router;
