const express = require('express');
const router = express.Router();


router.get('/all' , async(req, res) =>{
    try {
    let allAnimals = 
    } catch(error) {
        res.json({
            status: 'error',
            message: 'something went wrong!',
            payload: null
        })
    }
})

module.exports = router; 