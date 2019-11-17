const express = require('express');
const router = express.Router();

// const Researchers = require("/../models/Researchers");
const db = require('../database/dbFile.js')

//router to get all the researchers
router.get('/', async(req, res) => {
    // const queryParams = req.query;
    try {
    //         console.log('query', requestQuery)
       const requestQuery = `SELECT  * FROM researchers;`
   
        
       let allResearchers = await db.any(requestQuery)
        
        //  req.allResearchers = allResearchers
        
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

router.post('/', async(req, res) => {
    try {
   
        let insertQuery = `INSERT INTO researchers (name, job_title) VALUES($1, $2)`
        await db.one(insertQuery, [req.body.name, req.body.job_title])
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

router.patch('/:id', async(req, res) => {
    const researcherId = req.body 
    try {
        const updateQuery = `UPDATE researchers SET name WHERE id = $1`
            await db.any(updateQuery, [req.body.name, req.targetName.id])
            req.targetName.name = req.body.name
            res.json({
                        body: req.targetComment,
                        status: 'success',
                        message: 'Successfully updated researcher'
            })

    } catch (error) {
          res.json({
              status: 'failed',
              message: 'Something went wrong OR comment does not belonge to logged user'
          })

    }
})



module.exports = router;
