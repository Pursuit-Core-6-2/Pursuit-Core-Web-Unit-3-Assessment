const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/biology_research_db';
const db = pgp(connectString);



router.get("/", async (req, res, next) => {
    try {
        let response = await db.any("SELECT * FROM habitats;");
        res.json({
            status: "success",
            message: "retrieved all the  habitats",
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
        let selectQuery = `SELECT * FROM habitats WHERE id = $1`
        let user = await db.any(selectQuery, parseInt(req.params.id))

        res.json({
            status: "success",
            message: `retrieved single habitat`,
            payload: user
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": "habitat not found",
            "payload": null
        });
    }
})






router.post("/", async (req, res) => {
    try {
        let insertQuery = `INSERT INTO habitats(catergory) 
        VALUES($1);`
        await db.none(insertQuery, [req.body.catergory])
        res.json({
            body: req.body,
            message: `Added a new habitat`
        });
    } catch (error) {
        res.json({
            message: `There was an error!`
        });
    }
})








module.exports = router;