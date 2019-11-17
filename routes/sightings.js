const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/marine_db"
const db = pgp(connectionString);


router.get('/', async (req, res) => {
	try{
		let sightings = await db.any('SELECT * FROM sightings');
		res.json({status: 'success', message: 'Retrieved all sightings', payload: sightings});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.get('/species/:id', async (req, res) => {
	try{
		let species_id = parseInt(req.params.id);
		let sightings = await db.any('SELECT * FROM sightings WHERE species_id = $1', [species_id]);
		res.json({status: 'success', message: 'Retrieved all sightings', payload: sightings});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.get('/researchers/:id', async (req, res) => {
	try{
		let researcher_id = parseInt(req.params.id);
		let sightings = await db.any('SELECT * FROM sightings WHERE researcher_id = $1', [researcher_id]);
		res.json({status: 'success', message: 'Retrieved all sightings', payload: sightings});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.get('/habitats/:id', async (req, res) => {
	try{
		let habitat_id = parseInt(req.params.id);
		let sightings = await db.any('SELECT * FROM sightings WHERE habitat_id= $1', [habitat_id]);
		res.json({status: 'success', message: 'Retrieved all sightings', payload: sightings});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});





router.post('/', async (req, res) => {
	try{
		if(!((req.body.researcher_id) || (req.body.species_id)) || !(req.body.habitat_id)){
			throw new Error('Sighting must include a researcher id, species_id, and a habitat_id');
		}
		let researcher_id = parseInt(req.body.researcher_id);
		let species_id = parseInt(req.body.species_id);
		let habitat_id = parseInt(req.body.habitat_id);
		let queryString = `INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES($1, $2, $3)`;
		let insertStuff = await db.none(queryString, [researcher_id, species_id, habitat_id]);
		let payload = await db.any(`SELECT * FROM sightings WHERE researcher_id = $1 AND species_id = $2 AND habitat_id = $3`, [researcher_id, species_id, habitat_id]);
		res.json({status: 'success', message: 'Created new sighting', payload: payload });
	}
	catch(err){
		console.log(err);
		res.json({status: 'error', message: err, payload: null});
	}
})

router.delete('/:id', async (req, res) => {
	try{
		let payload = await db.any(`SELECT * FROM sightings WHERE id = $1`, [req.params.id]);
		let deleteStuff = await db.none('DELETE FROM sightings WHERE id = $1', [req.params.id]);
		res.json({status: 'success', message: 'Deleted sighting', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})


module.exports = router;

