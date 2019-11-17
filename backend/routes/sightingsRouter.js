const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')
//   console.log(db)
router.post('/', async(req, res) => {
   
   try {
       const insertQuery = `INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES($1, $2, $3)`
       await db.none(insertQuery, [req.body])
        console.log('researcher_id', req.body.researcher_id)
    //console.log(db)
        let data = {
         researcher_id: req.body.researcher_id,
             species_id: req.body.species_id,
             habitat_id: req.body.habitat_id,
            
    }
    res.json({
        payload: data,
      message: 'Successfully posted'
    })
    } catch (error) {
        console.log('error')

   }
})

// router.get('/', () )

module.exports = router;