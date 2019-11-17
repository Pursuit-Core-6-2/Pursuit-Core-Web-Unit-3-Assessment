const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/seed"; //url where psql is running
const db = pgp(connectionString); //connected db instance

const router = express.Router();

// GET ALL HABITATS
router.get("/", async (req, res) => {
    try {
        let habitats = await db.any(`SELECT * FROM habitats`);
        res.json({
            "status": "Success",
            "message": "Retrieved all habitats",
            "payload": habitats
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve all of the habitats",
            payload: null
        });
    }
});

//GET SINGLE HABITAT
router.get("/:id", async (req, res) => {
    try {
        let habitat = await db.any(`
        SELECT * FROM habitats
        WHERE id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved one habitat",
            "payload": habitat
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single habitat",
            payload: null
        });
    }
});

// ADD NEW HABITAT
router.post("/", async (req, res) => {
    console.log("POST method for adding a new habitat started");
    console.log("req.body:", req.body);
    let insertQuery = `
    INSERT INTO habitats (catergory) VALUES ($1)
    `;
    try {
        await db.none(insertQuery, [req.body.catergory]);
        res.json({
            "status": "Success",
            "message": "Added one habitat",
            "payload": [req.body.catergory]
        });
    } catch (error) {
        res.json({
            "status": "error",
            message: "Couldn't add a habitat",
            payload: null
        });
   }
});


module.exports = router;