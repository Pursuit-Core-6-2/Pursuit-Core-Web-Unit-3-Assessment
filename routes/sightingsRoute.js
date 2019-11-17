const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/seed"; //url where psql is running
const db = pgp(connectionString); //connected db instance

const router = express.Router();

// GET ALL SIGHTINGS
router.get("/", async (req, res) => {
    try {
        let sightings = await db.any(`SELECT * FROM sightings`);
        res.json({
            "status": "Success",
            "message": "Retrieved all sightings",
            "payload": sightings
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve all of the sightings",
            payload: null
        });
    }
});

//GET ALL SIGHTINGS OF A SPECIFIC SPECIES
router.get("/species/:id", async (req, res) => {
    try {
        let sighting = await db.any(`
        SELECT * FROM sightings
        WHERE species_id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved all sightings for type of species",
            "payload": sighting
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single sighting for species type",
            payload: null
        });
    }
});

//GET ALL SIGHTINGS OF A SPECIFIC RESEARCHER
router.get("/researchers/:id", async (req, res) => {
    try {
        let sighting = await db.any(`
        SELECT * FROM sightings
        WHERE researcher_id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved all sightings for a researcher",
            "payload": sighting
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single sighting for researchers",
            payload: null
        });
    }
});

//GET ALL SIGHTINGS OF A SPECIFIC HABITAT
router.get("/habitat/:id", async (req, res) => {
    try {
        let sighting = await db.any(`
        SELECT * FROM sightings
        WHERE habitat_id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved all sightings for a habitat",
            "payload": sighting
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single sighting for a habitat",
            payload: null
        });
    }
});

// DELETE SINGLE SIGHTING
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const inputQuery = (`DELETE FROM sightings WHERE id = $1`);

    try{
        await db.none(inputQuery, [id]);
        res.json({
            "status": "Success",
            message: "Deleted a sighting"
        });
    } catch (error) {
        console.log("Error:", error);
        res.json({
            "status": "error",
            message: "Couldn't delete a sighting",
            payload: null
        })
    }
});


module.exports = router;