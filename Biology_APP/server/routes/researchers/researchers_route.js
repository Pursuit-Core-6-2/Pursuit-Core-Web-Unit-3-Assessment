//routing
const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.json({
        message:"research route"
    })
})


router.get("/all", (req,res)=>{
    res.json({
        message: "get all users"
    })
})

router.get("/single",(req,res)=>{
    res.json({
        message: "get single user"
    })

})

router.post('/add',(req,res)=>{
    res.json({
        message: "post route"
    })
})

router.patch("/edit",(req,res)=>{
    res.json({
        message: "patch user"
    })
})

router.delete("/delete",(req,res)=>{
    res.json({
        message: "delete single user"
    })
})


module.exports = router;