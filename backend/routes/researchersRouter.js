const express = require('express');
const router = express.Router();

// const Researchers = require("/../models/Researchers");
const db = require('../database/dbFile.js')

//route to get all the researchers from the database
router.get('/', async(req, res) => {
   
    try {
       const requestQuery = `SELECT  * FROM researchers;`
         let allResearchers = await db.any(requestQuery)
        
        res.json({
            status: 'success',
            payload: allResearchers,
            message: 'Successfully retrieved all researchers'
         });
    
    } catch (error) {
        res.status(404)
        res.json({
            status: 'failed',
            message: 'Something went wrong'
        })
    }
})

// route to get researcher by id from database
router.get('/:id', async(req, res) => {
    let researcherId = req.params.id
    try {
        const requestQuery = `SELECT * FROM researchers WHERE id = $1`
        let Researcher = await db.one(requestQuery, [researcherId])
            res.json({

                status: 'success',
                payload: Researcher,
                message: 'Successfully retrieved all researchers'
             });

    } catch  (error) {
         res.status(404)
         res.json({
             status: 'failed',
             message: 'Could not retrieve researcher!!!!'
         })

    }
})

//route to add a researcher to the database
router.post('/', async(req, res) => {
    try {
   
        let insertQuery = `INSERT INTO researchers (name, job_title) VALUES($1, $2)`
        await db.none(insertQuery, [req.body.name, req.body.job_title])
        let data = {
            name: req.body.name,
            job_title: req.body.job_title
        }
       
        res.json({
            payload: data,
            status_code: 201,
            message: 'Researcher succesfully inserted'
        })
    
    } catch (error){
    res.json({
        status_code: 400,
        message: 'Bad Request!!'
    })

    }
})

//route to update a researcher's information using the researcher's id  
router.patch('/:id', async(req, res) => {
   
    try {
        const updateQuery = `UPDATE researchers SET name=$1 WHERE id = $2`
    
        await db.none(updateQuery, [req.body.name, req.body.id])
        res.json({
            name:req.body.name,
            status: 'success',
            message: 'Successfully updated researcher'
        })
          
        } catch (error) {
          res.json({
              status: 'failed',
              message: `Something went wrong could not update researcher's name`
          })

    }
})

//route to remove a researcher using the researcher's id
router.delete('/:id', async(req, res) => {
    const researcherId = req.params.id  
 
    try {
        const deleteQuery = `DELETE FROM researchers WHERE id = $1`

        await db.none(deleteQuery, [researcherId])
        res.json({
            status:'success',
            message: `Researcher successfully deleted`
        })

    } catch (error) {
        res.json({
            status: 'failed',
            message: `Couldn't delete researcher!!!`
        })
    }
})



module.exports = router;
