const express = require('express');
const router = express.Router();
const { db } = require('../database/index.js');

router.get('/',  async (req,res)=>{
   try {
       let species = await db.any("SELECT * FROM habitat")
       res.json({
           payload: species,
           message: 'Success. Retrieved all habitats.'
       })
   } catch (error) {
       console.log(error)
       res.status(404)
       res.json({
           message: "Error. No habitats logged."
       })
   }
})


// retrieving species by id
router.get('/:id', async(req, res)=>{
   let id = Number(req.params.id)
   try {
       let species = await db.one(`SELECT * FROM habitat WHERE id = ${id}`)
       res.json({
           payload : species,
           message : `Success. Retrieved habitat with id: ${id}`
       })
   } catch (error) {
       console.log(error)
       res.json({
           message: "Something went wrong."
       })
   }
})

router.post('/register', async (req, res)=>{
   let insertQuery =  `INSERT INTO habitat (category)
   VALUES($1);`

   let category = req.body.category

   let body = {
       name: category,
   }

   try{
       await db.none(insertQuery,[category])
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
