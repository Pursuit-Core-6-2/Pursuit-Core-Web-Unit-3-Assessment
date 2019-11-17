const express = require('express');
const router = express.Router();
const { db } = require('../database/index.js');

router.get('/',  async (req,res)=>{
   try {
       let animals = await db.any("SELECT * FROM animals")
       res.json({
           payload: animals,
           message: 'Success. Retrieved all animals.'
       })
   } catch (error) {
       console.log(error)
       res.status(404)
       res.json({
           message: "Error. No animals logged."
       })
   }
})


// retrieving animal by id
router.get('/:id', async(req, res)=>{
   let id = Number(req.params.id)
   try {
       let animal = await db.one(`SELECT * FROM animals WHERE ani_id = ${id}`)
       res.json({
           payload : animal,
           message : `Success. Retrieved animal with id: ${id}`
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: "Something went wrong."
       })
   }
})

//add new animal
router.post('/register', async (req, res)=>{
   let insertQuery =  `INSERT INTO researchers(species_id, nickname)
   VALUES($1, $2);`

   let species_id = req.body.species_id
   let nickname = req.body.nickname

   let body = {
       name: species_id,
       job_title: nickname
   }

   try{
       await db.none(insertQuery,[species_id, nickname])
       res.json({
           status : 'success',  
           message: 'Animal added',
           body: body
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: error.detail
       })
   }
})

//removing animal
router.delete('/:id', async(req, res) =>{
   let id = Number(req.params.id);
   console.log(id)
   try{
       let removedAnimal =  await db.none(`DELETE FROM animals WHERE ani_id = ${id}`)
       res.json({
           message: `Success! animal ${id} has been removed.`
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: `Unable to remove animal.`
       })
   }
   })

module.exports = router;