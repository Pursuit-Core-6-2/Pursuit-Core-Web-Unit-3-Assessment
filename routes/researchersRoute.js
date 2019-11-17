const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/seed"; //url where psql is running
const db = pgp(connectionString); //connected db instance

const router = express.Router();

// GET ALL RESEARCHERS
router.get("/", async (req, res) => {
    try {
        let researchers = await db.any(`SELECT * FROM researchers`);
        res.json({
            "status": "Success",
            "message": "Retrieved all researchers",
            "payload": researchers
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve all of the researchers",
            payload: null
        });
    }
});

//GET SINGLE RESEARCHER
router.get("/:id", async (req, res) => {
    try {
        let researcher = await db.any(`
        SELECT * FROM researchers
        WHERE id = $1`, [req.params.id]);
        res.json({
            "status": "Success",
            "message": "Retrieved one researcher",
            "payload": researcher
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            "status": "error",
            message: "Couldn't retrieve a single researcher",
            payload: null
        });
    }
});

// ADD NEW RESEARCHER
router.post("/", async (req, res) => {
    console.log("POST method for adding a new researcher started");
    console.log("req.body:", req.body);
    let insertQuery = `
    INSERT INTO researchers (researchers_name, job_title) VALUES ($1, $2)
    `;
    try {
        await db.none(insertQuery, [req.body.researchers_name, req.body.job_title]);
        res.json({
            "status": "Success",
            "message": "Added one researcher",
            "payload": [req.body.researchers_name, req.body.job_title]
        });
    } catch (error) {
        res.json({
            "status": "error",
            message: "Couldn't add a researcher",
            payload: null
        });
   }
});

// UPDATE SINGLE RESEARCHER
router.patch("/:id", async (req, res) => {
    console.log("PATCH method starting for researchers");
    console.log("req.body", req.body);
    const {id} = req.params;
    const inputQuery = `
    UPDATE researchers SET (researchers_name, job_title) = ($1, $2) WHERE id = $3;
    `;
    console.log("req.body:", req.body)
    try {
        await db.none(inputQuery, [req.body.researchers_name, req.body.job_title, id]);
        res.json({
            message:'Success. Post updated.',
            payload: req.body,
            success: true
        });
    } catch (error){
        console.log("Error:", error)
        res.json({
            message: "Failed to update post. Try again please",
            success: false
        });
    }
});

// DELETE SINGLE RESEARCHER
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const inputQuery = (`DELETE FROM researchers WHERE id = $1`);

    try{
        await db.none(inputQuery, [id]);
        res.json({
            "status": "Success",
            message: "Deleted a researcher"
        });
    } catch (error) {
        console.log("Error:", error);
        res.json({
            "status": "error",
            message: "Couldn't delete a researcher",
            payload: null
        })
    }
});


module.exports = router;