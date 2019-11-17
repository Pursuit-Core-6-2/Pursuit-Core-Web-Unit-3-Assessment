const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/marine_db"
const db = pgp(connectionString);


router.get('/', async (req, res) => {
	try{
		let species = await db.any('SELECT * FROM species');
		res.json({status: 'success', message: 'Retrieved all species', payload: species});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});


router.get('/:id', async (req, res) => {
	try{
		let speciesId = req.params.id;
		let species = await db.any(`SELECT * FROM species WHERE id = $1`, [speciesId]);
		res.json({status: 'success', message: 'Retrieved single species', payload: species});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.post('/', async (req, res) => {
	try{
		let requiredNames = ['name', 'is_mammal'];
		for(let i = 0; i < requiredNames.length; i++){
			if(!(requiredNames[i] in req.body)){
				throw new Error('Species must have a name and state whether it is a mammal or not');
			}
		};

		let queryString = `INSERT INTO species(name, is_mammal) VALUES($1, $2)`;
		let insertStuff = await db.none(queryString, [req.body.name, req.body.is_mammal]);
		let payload = await db.any(`SELECT * FROM species WHERE name = $1 AND is_mammal = $2`, [req.body.name, req.body.is_mammal]);
		res.json({status: 'success', message: 'Created new species', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})


module.exports = router;

