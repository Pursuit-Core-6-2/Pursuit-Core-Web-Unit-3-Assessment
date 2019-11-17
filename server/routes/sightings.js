const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/biology_research_db';
const db = pgp(connectString);



router.get("/", async (req, res, next) => {
    try {
        let response = await db.any("SELECT * FROM sightings;");
        res.json({
            status: "success",
            message: "retrieved all the  sightings",
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


router.get("/species/:id", async (req, res, next) => {
    try {
        let selectQuery = `SELECT * FROM sightings WHERE species_id = $1`
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





router.get("/researchers/:id", async (req, res, next) => {
    try {
        let selectQuery = `SELECT * FROM sightings WHERE researcher_ID = $1`
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






router.get("/habitats/:id", async (req, res, next) => {
    try {
        let selectQuery = `SELECT * FROM sightings WHERE habitat_id = $1`
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
        let insertQuery = `INSERT INTO sightings(researcher_ID, species_id, habitat_id) 
        VALUES($1,$2,$3);`
        await db.none(insertQuery, [req.body.researcher_ID, req.body.species_id,req.body.habitat_id])
        res.json({
            body: req.body,
            message: `Added a new sighting`
        });
    } catch (error) {
        res.json({
            message: `There was an error!`
        });
    }
})



router.delete("/:id", async (req, res) => {
    try {
        let deleteQuery = `DELETE FROM sightings WHERE id = $1;`
        await db.none(deleteQuery, parseInt(req.params.id));
        res.json({
            status: "success",
            message: `Removed a sighting`,
            payload: req.body
        });
    } catch (error) {
        res.json({
            status: "error",
            message: `Could not delete sighting`
        });
    }
})



router.get("/:id", async (req, res) => {
    try {
        let selectQuery = `SELECT * FROM sightings WHERE id = $1`
        let user = await db.any(selectQuery, parseInt(req.params.id))

        res.json({
            status: "success",
            message: `retrieved single sighting`,
            payload: user
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": "sighting not found",
            "payload": null
        });
    }
})






module.exports = router;