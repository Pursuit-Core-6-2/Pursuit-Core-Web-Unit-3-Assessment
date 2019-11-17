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

//create a new staff member
router.post('/', async (req, res) => {
    let addNewStaff =
    `INSERT INTO researchers(name, job_title)
        VALUES($1, $2)`
    
    try {
        await db.none(addNewStaff, [req.body.name, req.body.job_title])
        res.json({
            status: "success",
            message: "Created a new researcher",
            payload: req.body
        })
    } catch(error) {
        res.json({
            status: "error",
            message: "Could not create researcher",
            payload: null
        })
    }
})

//update an existing staff member
router.patch('/:staff_id', async (req, res) => {
    let updateInfo = ''
    for(key in req.body) {
        let set = `${key} = '${req.body[key]}'`
        updateInfo += set + ','
    }

    updateInfo = updateInfo.slice(0, updateInfo.length - 1)
    console.log(updateInfo)

    let updateStaff = 
    `
        UPDATE researchers
        SET ${updateInfo}
        WHERE id = '${req.params.staff_id}'
    `
    try {
        await db.none(updateStaff)
        res.json({
            status: "success",
            message: "Researcher updated",
            payload: req.body
        })
    } catch(error) {
        console.log(error)
        res.json({
            status: "error",
            message: "Could not update researcher",
            payload: null
        })
    }
})

router.delete('/:staff_id', async (req, res) => {
    let staffDelete =
    `DELETE FROM researchers WHERE id = '${req.params.staff_id}'`
    
    let staffMember = await db.one (
        `SELECT
            *
        FROM
            researchers
        WHERE id = ${req.params.staff_id}`)

    console.log(staffMember)

    try {
        await db.none(staffDelete)
        res.json({
            status: "success",
            message: "Researcher deleted",
            payload: staffMember
        })
    } catch(error) {
        res.json({
            status: "error",
            message: 'Could not delete researcher',
            payload: null
        })
    }
})

module.exports = router;