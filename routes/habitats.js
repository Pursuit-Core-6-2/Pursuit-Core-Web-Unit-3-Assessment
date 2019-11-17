const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/marine_db"
const db = pgp(connectionString);


router.get('/', async (req, res) => {
	try{
		let habitats = await db.any('SELECT * FROM habitats');
		res.json({status: 'success', message: 'Retrieved all habitats', payload: habitats});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});


router.get('/:id', async (req, res) => {
	try{
		let habitatId = req.params.id;
		let habitat = await db.any(`SELECT * FROM habitats WHERE id = $1`, [habitatId]);
		res.json({status: 'success', message: 'Retrieved single habitats', payload: habitat});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.post('/', async (req, res) => {
	try{
		if(!req.body.category){
			throw new Error('Habitat must have a category? otherwise what are you doing?');
		}
		let queryString = `INSERT INTO habitats(category) VALUES($1)`;
		let insertStuff = await db.none(queryString, [req.body.category]);
		let payload = await db.any(`SELECT * FROM habitats WHERE category = $1`, [req.body.category]);
		res.json({status: 'success', message: 'Created new habitat', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})

module.exports = router;

