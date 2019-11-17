const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/seed"; //url where psql is running
const db = pgp(connectionString); //connected db instance

const router = express.Router();

// GET ALL SPECIES
router.get("/", async (req, res) => {
    try {
        let species = await db.any(`SELECT * FROM species`);
        res.json({
            "status": "Success",
            "message": "Retrieved all species",
            "payload": species
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve all of the species",
            payload: null
        });
    }
});

//GET SINGLE SPECIES
router.get("/:id", async (req, res) => {
    try {
        let species = await db.any(`
        SELECT * FROM species
        WHERE id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved one species",
            "payload": species
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single species",
            payload: null
        });
    }
});

// ADD NEW SPECIES
router.post("/", async (req, res) => {
    console.log("POST method for adding a new species started");
    console.log("req.body:", req.body);
    let insertQuery = `
    INSERT INTO species (species_name, is_mammal) VALUES ($1, $2)
    `;
    try {
        await db.none(insertQuery, [req.body.species_name, req.body.is_mammal]);
        res.json({
            "status": "Success",
            "message": "Added a new species",
            "payload": [req.body.species_name, req.body.is_mammal]
        });
    } catch (error) {
        res.json({
            "status": "error",
            message: "Couldn't add a new species",
            payload: null
        });
   }
});


module.exports = router;