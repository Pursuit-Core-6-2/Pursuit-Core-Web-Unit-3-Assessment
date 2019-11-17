const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/seed"; //url where psql is running
const db = pgp(connectionString); //connected db instance

const router = express.Router();

// GET ALL ANIMALS
router.get("/", async (req, res) => {
    try {
        let animals = await db.any(`SELECT * FROM animals`);
        res.json({
            "status": "Success",
            "message": "Retrieved all animals",
            "payload": animals
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve all of the animals",
            payload: null
        });
    }
});

//GET SINGLE ANIMAL
router.get("/:id", async (req, res) => {
    try {
        let animal = await db.any(`
        SELECT * FROM animals
        WHERE id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved one animal",
            "payload": animal
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single animal",
            payload: null
        });
    }
});

// ADD NEW ANIMAL
router.post("/", async (req, res) => {
    console.log("POST method for adding a new animal started");
    console.log("req.body:", req.body);
    let insertQuery = `
    INSERT INTO animals (species_id, nickname) VALUES ($1, $2)
    `;
    try {
        await db.none(insertQuery, [req.body.species_id, req.body.nickname]);
        res.json({
            "status": "Success",
            "message": "Added one researcher",
            "payload": [req.body.species_id, req.body.nickname]
        });
    } catch (error) {
        res.json({
            "status": "error",
            message: "Couldn't add a animal",
            payload: null
        });
   }
});

// UPDATE SINGLE ANIMAL
router.patch("/:id", async (req, res) => {
    console.log("PATCH method starting for animals");
    console.log("req.body", req.body);
    const {id} = req.params;
    const inputQuery = `
    UPDATE animals SET (species_id, nickname) = ($1, $2) WHERE id = $3;
    `;
    console.log("req.body:", req.body)
    try {
        await db.none(inputQuery, [req.body.species_id, req.body.nickname, id]);
        res.json({
            message:'Success. Post updated.',
            payload: req.body,
            success: true
        });
    } catch (error){
        console.log("Error:", error)
        res.json({
            message: "Failed to update animal. Try again please",
            success: false
        });
    }
});

// DELETE SINGLE ANIMAL
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const inputQuery = (`DELETE FROM animals WHERE id = $1`);

    try{
        await db.none(inputQuery, [id]);
        res.json({
            "status": "Success",
            message: "Deleted a animal"
        });
    } catch (error) {
        console.log("Error:", error);
        res.json({
            "status": "error",
            message: "Couldn't delete a animal",
            payload: null
        })
    }
});


module.exports = router;