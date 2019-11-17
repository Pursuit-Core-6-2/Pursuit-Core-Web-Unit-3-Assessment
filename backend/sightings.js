const express = require('express')
const router = express.Router()
const db =require('./db')

router.get('', async (req, res) => {
    try{
        let sightings = await db.any('SELECT * FROM sightings')
        res.json({
            "status": "success",
            "message": "retrieved sightings",
            "payload": sightings
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})

router.get('/species/:id', async (req, res) => {
        try{
      let getSightings = await db.one(`SELECT s.id sightings, 
      sp.name species 
      FROM sightings s  
      INNER JOIN species sp on s.species_id = sp.id 
      WHERE s.id = ${req.params.id}`);
        res.json({
            "status": "success",
            "message": "retrived",
            "payload": getSightings,
        })
    }catch (error) {
        // console.log(error);
        res.json({
            message: error
        })
        }
    })


    router.get('/researchers/:id', async (req, res) => {
            try{
          let getResearchersSightings = await db.one(`SELECT s.id sightings, 
          r.name researchers 
          FROM sightings s 
          INNER JOIN researchers r 
          ON s.researcher_id = r.id 
          WHERE s.id = ${req.params.id}`);
            res.json({
                "status": "success",
                "message": "retrived",
                "payload": getResearchersSightings,
            })
        }catch (error) {
            // console.log(error);
            res.json({
                message: error
            })
            }
        })

router.get('/habitats/:id', async(req, res) => {
     try{
        let getHabitatSightings = await db.one(`select s.id sightings, 
        h.category habitats 
        FROM sightings s  
        INNER JOIN habitats h ON s.habitat_id = h.id 
        WHERE s.id = ${req.params.id}`);
          res.json({
              "status": "success",
              "message": "retrived",
              "payload": getHabitatSightings,
          })
      }catch (error) {
          // console.log(error);
          res.json({
              message: error
          })
          }
})

router.post('', async(req, res) => {
    try{
        let researcher = req.body.researcher_id;
        let species = req.body.species_id;
        let habitat = req.body.habitat_id;

        let insertQuery = `INSERT into sightings(researcher_id, species_id, habitat_id)VALUES($1,$2,$3)`

        if(!researcher || !species|| !habitat){
            res.json({
                "message": "Information Missing"
            })
        }else{
            await db.none(insertQuery, [researcher, species, habitat]);
            res.json({
                "status": "success",
                "message": "posted"
            })
        }
    }catch(error){
        console.log(error)
        res.json({
            "message": error
        })
    }
})

router.delete('/:id', async(req, res) => {
    try{
        let deleteSightings = await db.one(`DELETE FROM sightings WHERE id = ${req.params.id} RETURNING *`)
        res.json({
            "message": "deleted sightings",
            "payload": deleteSightings
        })
    }catch(error){
        res.json({
            "message": error
        })
    }
})


// ------------------------

router.get('/allSightings', async (req, res) => {
        try{
      let sightings = await db.any(`SELECT s.id sightings, r.name researchers, sp.name species, h.category habitats
      FROM sightings s 
      INNER JOIN researchers r ON s.researcher_id = r.id 
      INNER JOIN species sp ON s.species_id = sp.id
      INNER JOIN habitats h ON s.habitat_id = h.id`);
        res.json({
            "status": "success",
            "message": "retrived",
            "payload": sightings,
        })
    }catch (error) {
        console.log(error);
        res.json({
            message: error
        })
        }
    })

module.exports = router