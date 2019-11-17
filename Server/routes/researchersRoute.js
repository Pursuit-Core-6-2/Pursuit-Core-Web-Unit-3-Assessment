const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./promiseConfig')

//get all researchers
router.get('/', async (req, res) => {
    console.log('Researchers endpoint reached/ ', Date())
    try {
        let researchers = await db.any (`
            SELECT
                *
            FROM
                researchers
        `)
        res.json({
                status: "success",                      
                message: "retrieved all researchers", 
                payload: researchers
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "error",
            message: "researchers not found",
            payload: null
        })
    }
})

//Get researcher by ID
router.get('/:staff_id', async (req, res) => {
    let findStaff = `
        SELECT *
        FROM researchers
        WHERE id = $1
    `
    console.log('Researchers single endpoint reached/ ', Date())

    try {
        let staff = await db.one(findStaff, [req.params.staff_id])
        res.json({
            status: "success",
            message: "retrieved single researcher",
            payload: staff
        })
    } catch (error) {
        res.status(500)
        console.log(error)
        res.json({
            status: "error",
            message: "researcher not found",
            payload: null
        })
    }
})

module.exports = router;