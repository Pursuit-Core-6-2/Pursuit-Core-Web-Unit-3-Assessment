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
      let getSightings = await db.any(`SELECT 
                    i.id sightings
                     n.name  species ,
                     h.category habitat
                  FROM sightings s
                  FULL OUTER JOIN species sp
                  ON s.species_id = sp.id 
                  FULL OUTER JOIN
                  WHERE owner_id = ${req.params.owner_id}`);
        res.json({
            album: getAlbums,
            message: "success"
        })
    }catch (error) {
        // console.log(error);
        res.json({
            message: error
        })
        }
    })


module.exports = router