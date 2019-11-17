const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/biology_research_db';
const db = pgp(connectString);



router.get("/", async (req, res, next) => {
    try {
        let response = await db.any("SELECT * FROM species;");
        res.json({
            status: "success",
            message: "retrieved all the  species",
            payload: response
        });
    } catch (error) {
        log(error);
        res.status(500).json({
            status: "error",
            message: "Error: Something went wrong",
            payload: null
        });
    }
})


router.get("/:id", async (req, res) => {
    try {
        let selectQuery = `SELECT * FROM species WHERE id = $1`
        let user = await db.any(selectQuery, parseInt(req.params.id))

        res.json({
            status: "success",
            message: `retrieved single species`,
            payload: user
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": "species not found",
            "payload": null
        });
    }
})






router.post("/", async (req, res) => {
    try {
        let insertQuery = `INSERT INTO species(name,is_mamamal) 
        VALUES($1,$2);`
        await db.none(insertQuery, [req.body.name, req.body.is_mamamal])
        res.json({
            body: req.body,
            message: `Added a new researcher`
        });
    } catch (error) {
        res.json({
            message: `There was an error!`
        });
    }
})








module.exports = router;