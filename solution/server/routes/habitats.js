const express = require('express');
const router = express.Router();
const db = require('./pgp.js')

router.get('/', async (req, res) => {
    try {
        let habitats = await db.any('SELECT * FROM habitats');
        res.json({
            status: 'Success',
            message: 'Retrieved all habitats',
            payload: habitats,
        })
    }
    catch (error){
        res.json({
            status: 'Error',
            message: 'Could not load habitats.',
            payload: null,
        });
    }
});
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let habitat = await db.one('SELECT * FROM habitats WHERE id = $1', id);
        res.json({
            status: 'Success',
            message: 'Habitat retrieved',
            payload: habitat
        });
    }
    catch(error) {
        res.json({
            status: 'Error',
            message: 'Could not load habitat.',
            payload: null,
        });
    }
});

module.exports = router;

