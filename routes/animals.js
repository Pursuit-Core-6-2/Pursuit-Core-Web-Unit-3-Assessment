const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/marine_db"
const db = pgp(connectionString);


router.get('/', async (req, res) => {
	try{
		let animals = await db.any('SELECT * FROM animals');
		res.json({status: 'success', message: 'Retrieved all animals', payload: animals});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});


router.get('/:id', async (req, res) => {
	try{
		let animalId = req.params.id;
		let animal = await db.any(`SELECT * FROM animals WHERE id = $1`, [animalId]);
		res.json({status: 'success', message: 'Retrieved single animal', payload: animal});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.post('/', async (req, res) => {
	try{
		if(!(req.body.species_id) || !(req.body.nickname)){
			throw new Error('Animal must have a nickname and a species id');
		}
		let queryString = `INSERT INTO animals(species_id, nickname) VALUES($1, $2)`;
		let insertStuff = await db.none(queryString, [req.body.species_id, req.body.nickname]);
		let payload = await db.any(`SELECT * FROM animals WHERE species_id = $1 AND nickname = $2`, [req.body.species_id, req.body.nickname]);
		res.json({status: 'success', message: 'Created new animal!!!', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})

router.patch('/:id', async (req, res) => {
	try{
		let update;
		let id = parseInt(req.params.id);
		if((req.body.nickname) && (req.body.species_id)){
			update = await db.none(`UPDATE animals SET species_id = $1 WHERE id = $2`, [req.body.species_id, id]);
			update = await db.none(`UPDATE animals SET nickname = $1 WHERE id = $2`, [req.body.nickname, id]);
		}
		else if(req.body.nickname) {
			update = await db.none('UPDATE animals SET nickname = $1 WHERE id = $2', [req.body.nickname, req.params.id]);
		}
		else{
			update = await db.none('UPDATE animals SET species_id = $1 WHERE id = $2', [req.body.species_id, req.params.id]);
		}
	
		let payload = await db.any(`SELECT * FROM animals WHERE id = $1`, [req.params.id]);
		res.json({status: 'success', message: 'Updated animal', payload: payload });
	}
	catch(err){
		console.log(err);
		res.json({status: 'error', message: err, payload: null});
	}
	}
)

router.delete('/:id', async (req, res) => {
	try{
		let payload = await db.any(`SELECT * FROM animals WHERE id = $1`, [req.params.id]);
		let deleteStuff = await db.none('DELETE FROM animals WHERE id = $1', [req.params.id]);
		res.json({status: 'success', message: 'Deleted animal', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})


module.exports = router;

