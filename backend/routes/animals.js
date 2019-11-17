const express = require('express');
const router = express.Router();
//const researcher = require("./researcher.js");
const db  = require('./researchers').db

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


// retrieving researcher by id
router.get('/:id', async(req, res)=>{
   let id = Number(req.params.id)
   try {
       let animal = await db.one(`SELECT * FROM animals WHERE id = ${id}`)
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

module.exports = router;