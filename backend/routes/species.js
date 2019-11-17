const express = require('express');
const router = express.Router();
const { db } = require('../database/index.js');

router.get('/',  async (req,res)=>{
   try {
       let species = await db.any("SELECT * FROM species")
       res.json({
           payload: species,
           message: 'Success. Retrieved all logged species.'
       })
   } catch (error) {
       console.log(error)
       res.status(404)
       res.json({
           message: "Error. No animals logged."
       })
   }
})


// retrieving species by id
router.get('/:id', async(req, res)=>{
   let id = Number(req.params.id)
   try {
       let species = await db.one(`SELECT * FROM species WHERE id = ${id}`)
       res.json({
           payload : species,
           message : `Success. Retrieved animal with id: ${id}`
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: "Something went wrong."
       })
   }
})

router.post('/register', async (req, res)=>{
   let insertQuery =  `INSERT INTO researchers(name, is_mammal)
   VALUES($1, $2);`

   let name = req.body.name
   let is_mammal = req.body.is_mammal

   let body = {
       name: name,
       is_mammal: is_mammal
   }

   try{
       await db.none(insertQuery,[name, is_mammal])
       res.json({
           status : 'success',  
           message: 'Species added',
           body: body
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: error.detail
       })
   }
})

module.exports = router;