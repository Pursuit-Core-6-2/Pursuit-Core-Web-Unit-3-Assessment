//routing
const express = require('express');
const router = express.Router();
const db = require("../Database/database")

// Animals
// GET /animals: Get all animals.
// GET /animals/:id: Get single animal.
// POST /animals: Add new animal.
// PATCH /animals/:id: Update single animal.
// DELETE /animals/:id: Delete single animal.

//get all animals
router.get("/", async (req,res)=>{
    await db.any("SELECT * FROM animals")
    .then(function(data){
        const response = {
            animals: data
        }
        
        res.json({
            payload: response,
            message: "get all animals"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})


//get one animal
router.get("/:id",(req,res)=>{
    db.one(`SELECT * FROM animals Where id = $1`,[req.params.id])
    .then(function(data){
        const response = {
            animals: data
        }
        
        res.json({
            payload: response,
            message: "get one animal"
        })
    }).catch(function(error){
        res.send("An Error occured" + error)
    })
})

//post one animal
router.post('/', async (req,res)=>{
    let insert = `
    INSERT INTO animals(species_id,nickname)
    VALUES ($1,$2)`

    try{
        await db.none(insert,[req.body.species_id,req.body.nickname])
        res.json({
            payload: req.body,
            message:"Post recieved"
        })
    }catch(error){
        res.status(500)
        res.json({
            message: "you messed up"
        })
    }
})


//patch animal
router.patch("/:id",async(req,res)=>{
    
        try {
            let data;
            if (req.body.nickname && req.body.species_id) {
                data = await db.one(
                    `UPDATE animals SET nickname = $/nickname/, species_id = $/species_id/ WHERE id = $/id/ RETURNING *`, 
                    {id: req.params.id, nickname: req.body.nickname, species_id: req.body.species_id}
                )
                
            } else if (req.body.species_id) {
                data = await db.one(
                    `UPDATE animals SET species_id = $/species_id/ WHERE id = $/id/ RETURNING *`, 
                    {id: req.params.id, species_id: req.body.species_id}
                )
            } else {
                data = await db.one(
                    `UPDATE animals SET nickname = $/nickname/ WHERE id = $/id/ RETURNING *`, 
                    {id: req.params.id, nickname: req.body.nickname}
                )
            }
            
            res.status(200)
            res.json({
                status: 'success',
                message: 'animal updated',
                payload: data
            });
    
        } catch (err) {
            res.status(400)
            res.json({
                status: err,
                message: "you messed up" + err,
                payload: null
            });
        }
})

router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        id = Number(id);
        const data = await db.one(
            `DELETE FROM animals WHERE id = $/id/ RETURNING *`
            , { id }
        )

        // Success
        res.status(200).json({
            status: 'success',
            message: 'Animal deleted',
            payload: data
        });

    } catch (err) {
        if (err) {
            console.log(err)
            res.status(400).json({
                status: "error",
                message: "Animal not found",
                payload: null
            });
        }
    }
})




module.exports = router;