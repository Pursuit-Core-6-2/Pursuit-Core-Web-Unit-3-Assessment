const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/biology_research_db';
const db = pgp(connectString);



router.get("/", async (req, res, next) => {
    try {
        let response = await db.any("SELECT * FROM animals;");
        res.json({
            status: "success",
            message: "retrieved all the animals",
            payload: response
        });
    } catch (error) {
        log(error);
        res.status(500).json({
            status: "fail",
            message: "Cannot retrive all the animals",
            payload: null
        });
    }
})


router.get("/:id", async (req, res) => {
    try {
        let selectQuery = `SELECT * FROM animals WHERE id = $1`
        let singleAnimal = await db.any(selectQuery, parseInt(req.params.id))
        if (singleAnimal.length === 1) {
            res.json({
                status: "success",
                message: `Here is a single animal!`,
                payload: singleAnimal
            });
        } else {
            return error;
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `animal not found`,
            payload: null
        });
    }
})

router.post("/", async (req, res) => {
    try {
        let insertQuery = `INSERT INTO animals(species_id,nickname) 
        VALUES($1,$2);`
        await db.none(insertQuery, [req.body.species_id, req.body.nickname])
        if (req.body.nickname === "") {
            return error
        } else {
            res.json({
                status: "success",
                message: `Added a new animal`,
                payload: req.body
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `no animal added!`

        });
    }
})


router.patch('/:id', async (req, res, next) => {
    try {
        let animal_id = parseInt(req.params.id)
        let updateQuery =
            `UPDATE animals
        SET species_id = $1, 
        nickname = $2
        wHERE id = $3`
        await db.none(updateQuery, [req.body.species_id, req.body.nickname, animal_id])
        if (req.body.nickname === "") {
            return error
        } else {
            res.json({
                status: "success",
                message: `Updated animal Info`,
                payload: req.body
            });
        }
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
        let selectQuery = `SELECT * FROM animals WHERE id = $1`
        let singleAnimal = await db.any(selectQuery, parseInt(req.params.id))
        console.log(singleAnimal.length)
        if (singleAnimal.length === 1) {
            let deleteQuery = `DELETE FROM animals WHERE id = $1;`
            await db.none(deleteQuery, parseInt(req.params.id));

            res.json({
                status: "success",
                message: `Removed a researcher`,
                payload: singleAnimal
            });
        } else {
            return error;
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `There was an error!`
        });
    }
})



module.exports = router;