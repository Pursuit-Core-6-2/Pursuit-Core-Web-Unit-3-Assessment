const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/marine_db"
const db = pgp(connectionString);


router.get('/', async (req, res) => {
	try{
		let researchers = await db.any('SELECT * FROM researchers');
		res.json({status: 'success', message: 'Retrieved all researchers', payload: researchers});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});


router.get('/:id', async (req, res) => {
	try{
		let researcherId = req.params.id;
		let researcher = await db.any(`SELECT * FROM researchers WHERE id = $1`, [researcherId]);
		res.json({status: 'success', message: 'Retrieved single researcher', payload: researcher});
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
});

router.post('/', async (req, res) => {
	try{
		if(!(req.body.name) || !(req.body.job_title)){
			throw new Error('Researcher must have both a name and a job title');
		}
		let queryString = `INSERT INTO researchers(name, job_title) VALUES($1, $2)`;
		let insertStuff = await db.none(queryString, [req.body.name, req.body.job_title]);
		let payload = await db.any(`SELECT * FROM researchers WHERE name = $1 AND job_title = $2`, [req.body.name, req.body.job_title]);
		res.json({status: 'success', message: 'Created new researcher', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})

router.patch('/:id', async (req, res) => {
	try{
		let update;
		let id = parseInt(req.params.id);
		if((req.body.name) && (req.body.job_title)){
			update = await db.none(`UPDATE researchers SET name = $1 WHERE id = $2`, [req.body.name, id]);
			update = await db.none(`UPDATE researchers SET job_title = $1 WHERE id = $2`, [req.body.job_title, id]);
		}
		else if(req.body.name) {
			update = await db.none('UPDATE researchers SET name = $1 WHERE id = $2', [req.body.name, req.params.id]);
		}
		else{
			update = await db.none('UPDATE researchers SET job_title = $1 WHERE id = $2', [req.body.job_title, req.params.id]);
		}
	
		let payload = await db.any(`SELECT * FROM researchers WHERE id = $1`, [req.params.id]);
		res.json({status: 'success', message: 'Updated researcher', payload: payload });
	}
	catch(err){
		console.log(err);
		res.json({status: 'error', message: err, payload: null});
	}
	}
)

router.delete('/:id', async (req, res) => {
	try{
		let payload = await db.any(`SELECT * FROM researchers WHERE id = $1`, [req.params.id]);
		let deleteStuff = await db.none('DELETE FROM researchers WHERE id = $1', [req.params.id]);
		res.json({status: 'success', message: 'Deleted researcher', payload: payload });
	}
	catch(err){
		res.json({status: 'error', message: err, payload: null});
	}
})


module.exports = router;

