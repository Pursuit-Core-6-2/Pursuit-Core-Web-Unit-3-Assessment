const express = require('express');
const router = express.Router();

const db = require('../database/dbFile.js')

/////////////////////////////////////////////

//route to get all the animals in database
router.get('/', async(req, res) => {
    
    try {
        const requestQuery = `SELECT * FROM animals`
        let allAnimals = await db.any(requestQuery)
        console.log('animals', allAnimals)
    res.status(200)
    res.json({
        animals: allAnimals,
        status: 'success',
        message: 'Successfully retrieved all animals'
    });

    } catch (error) {
         res.status(404)
         res.json({
             status: 'failed',
             message: 'Something went wrong'
         })
    }
})

//////////////////////////////////////////////

//route to get a single animal using the animal's id 
router.get('/:id', async(req, res) => {
    const animalId = req.params.id
    try {
        const requestQuery = `SELECT * FROM animals WHERE id = $1`

        let animal = await db.any(requestQuery, [animalId])
        res.status(200)
        res.json({
           animals: animal,
            status: 'successful',
            message: 'The request was successful!!!'
        })
    } catch (error) {
        res.status(400)
        res.json({
            status: 'failed',
            message: `Unable to fufill the request`
        })

    }
})
////////////////////////////////////////

//route to add a new animal to the database
router.post('/', async(req, res) => {
    try {
        const insertQuery = `INSERT INTO animals (species_id, nickname) VALUES ($1, $2)`
        await db.none(insertQuery, [req.body.species_id, req.body.nickname])

        let data = {
            species_id: req.body.species_id,
            nickname: req.body.nickname
        }
       
        res.status(201)
        res.json({
            animals: data,
            status: 'successful',
            message: `Animal was added successfully`
        })
    } catch (error) {
        res.status(400) 
        res.json({
            status: 'failed',
            message: `Failed to add animal to data`
        })
        
    }
})
////////////////////////////////////////////////////////

//route to update a single animal using its id
router.patch('/:id', async(req, res) => {
        const animalId = req.params.id
       
    try {
        const updateQuery = ` UPDATE animals SET nickname=$1 WHERE id=$2`
        await db.any(updateQuery, [req.body.nickname, animalId, ])
        
        console.log('nickname', req.body.nickname)

         res.status(200)
        res.json({
            nickname: req.body.nickname,
            status: 'success',
            message: 'Updated animal successfully!'
        })

     } catch (error) {
        res.status(400)
        res.json({
            status:' failed',
            message: 'Was not able to update animal'
        })
    }
})
/////////////////////////////////////////////////////////

//route to delete a single animal using the animal's id 
router.delete('/:id', async(req, res) => {
   const animalId = req.params.id;

   try {
       const deleteQuery = `DELETE FROM animals WHERE id=$1`

         await db.none(deleteQuery, [animalId])
        res.status(200)
         res.json({
             status: 'success',
             message: `Animal successfully deleted`
         })

         }
         catch (error) {
             res.status(400)
             res.json({
                 status: 'failed',
                 message: `Couldn't delete animal!!!`
             })
         }

  
})



module.exports = router;