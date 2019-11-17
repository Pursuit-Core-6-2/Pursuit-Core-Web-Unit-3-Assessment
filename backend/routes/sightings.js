const express = require('express');
const router = express.Router();
const { db } = require('../database/index.js');
const researchers = require('./researchers')
const species = require('./species')

router.get('/',  async (req,res)=>{
   try {
       let species = await db.any("SELECT * FROM sightings")
       res.json({
           payload: species,
           message: 'Success. Retrieved all logged sightings.'
       })
   } catch (error) {
       console.log(error)
       res.status(404)
       res.json({
           message: "Error. No animals logged."
       })
   }
})


router.post('/sightings', async (req, res)=>{
   let insertQuery =  `INSERT INTO sightings(species_id, researcher_id, habitat_id)
   VALUES($1, $2, $3);`

   let species_id = req.body.species_id
   let researcher_id = req.body.researcher_id
   let habitat_id = req.body.habitat_id

   let body = {
       species_id: species_id,
       researcher_id: researcher_id,
       habitat_id: habitat_id
   }

   try{
       await db.none(insertQuery,[species_id, researcher_id, habitat_id])
       res.json({
           status : 'success',  
           message: 'Sighting added',
           body: body
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: error.detail
       })
   }
})

router.delete('/:id', async(req, res) =>{
   let id = Number(req.params.id);
   console.log(id)
   try{
       let removedSighting =  await db.none(`DELETE FROM species WHERE spe_id = ${id}`)
       res.json({
           message: `Success! sighting ${id} has been removed.`
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: `Unable to remove logged sighting.`
       })
   }
   })

//sightings from specific researcher
router.get('/researchers/:id', async (req,res) => {
   let id = Number (req.params.id);
   
   try{
      let sightings = await db.any(`SELECT * FROM sightings WHERE researcher_id = ${id}`)
      res.json({
         payload: sightings,
         message: `Success. Retrieved all logged sightings for researcher ${id}.`
     })
   } catch (error) {
      console.log(error)
      res.json({
          message: "Something went wrong."
      })
   }
})

router.get('/species/:id', async (req,res) => {
   let id = Number (req.params.id);
   try{
      let sightings = await db.any(`SELECT * FROM sightings WHERE species_id = ${id}`)
      res.json({
         payload: sightings,
         message: `Success. Retrieved all logged sightings for species ${id}.`
     })
   } catch (error) {
      console.log(error)
      res.json({
          message: "Something went wrong."
      })
   }
})
   
   module.exports = router;