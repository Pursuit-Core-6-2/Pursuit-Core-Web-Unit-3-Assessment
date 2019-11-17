const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')

router.get('/', (req, res) => {
     let allanimals = await db.any(requestQuery)

   try {

     res.json({

         status: 'success',
         payload: allAnimals,
         message: 'Successfully retrieved all animals'
     });

     }
     catch (error) {
         res.status(404)
         res.json({
             status: 'failed',
             message: 'Something went wrong'
         })
     }
})

module.exports = router;