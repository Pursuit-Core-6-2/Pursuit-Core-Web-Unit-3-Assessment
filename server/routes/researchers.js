const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/biology_research_db';
const db = pgp(connectString);



router.get("/", async (req, res, next) => {
    try {
        let response = await db.any("SELECT * FROM researchers;");
        res.json({
            status: "success",
            message: "retrieved all the users",
            payload: response
        });
    } catch (error) {
        log(error);
        res.status(500).json({
            status: "fail",
            message: "Error: something went wrong"
        });
    }
})


router.get("/:id", async (req, res) => {
    try {

        let selectQuery = `SELECT * FROM researchers WHERE id = $1`
        let singleResearcher = await db.any(selectQuery, parseInt(req.params.id))
        if (singleResearcher.length === 1) {
            res.json({
                status: "success",
                message: `Here is a single researcher!`,
                payload: singleResearcher
            });
        } else {
            return error
        }



    } catch (error) {
        res.json({
            status: "error",
            message: `researcher not found`,
            payload: null
        });
    }
})






router.post("/", async (req, res) => {
    try {
        let insertQuery = `INSERT INTO researchers(name,job_title) 
        VALUES($1,$2);`
        await db.none(insertQuery, [req.body.name, req.body.job_title])
        if (req.body.job_title === "" || req.body.name === "") {
            return error
            // }else if (req.body.job_title === "" && req.body.name === "" ){
            //     return error
        } else {

            res.json({
                status: "success",
                message: `Added a new researcher`,
                payload: req.body
            });

        }
    } catch (error) {
        res.json({
            status: "error",
            message: `no researcher added!`

        });
    }
})




router.patch('/:id', async (req, res, next) => {
    try {
        let researcher_id = parseInt(req.params.id)
        let updateQuery =
            `UPDATE researchers
        SET name = $1, 
        job_title = $2
        wHERE id = $3`
        await db.none(updateQuery, [req.body.name, req.body.job_title, researcher_id])
        res.json({
            status: "success",
            message: `Updated researcher Info`,
            payload: req.body
        });
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed to Update`,
            payload: null

        })
    }
})






router.delete("/:id", async (req, res) => {
    try {
        let selectQuery = `SELECT * FROM researchers WHERE id = $1`
        let singleResearcher = await db.any(selectQuery, parseInt(req.params.id))
        if (singleResearcher.length === 1) {
            let deleteQuery = `DELETE FROM researchers WHERE id = $1;`
            await db.none(deleteQuery, parseInt(req.params.id));
            res.json({
                status: "success",
                message: `Removed a researcher`,
                payload: singleResearcher
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `There was an error!`
        });
    }
})



module.exports = router;