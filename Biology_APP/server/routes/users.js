//routing
const express = require('express');
const router = express.Router();

//database
const pgp = require('pg-promise')();
const connectionString = 'postgress://localhost:5432/facebook_db'
const db = pgp(connectionString);
///////////////////////////


/*
first create the route using the express.Router function
we are creating a get req from the server. so we use router.get
next we set the arguments using the declared route /all and the 
request "req" and response 'res'. 

next step is to use the db variable where we use the pg promise function
and the connestion string that is linked to our database.

from db any we use the Select keyword and the * key to select from the
table users.

next we use a try and catch function to get all users from the user table
and send it back
*/
router.get("/all",(req,res)=>{
    //get users from the database
    db.any('SELECT * FROM users')
    .then(function(data){
        const response ={
            users: data
        }
        res.send(response);
    }).catch(function(error){
        res.send('An error occured: ' + error)
    })
})

/*
next for the post req we use declare the route and /register
and use the req.body to get information from the user.
we then insert the data into the users table and 
use a Query with formatting paramaters to get the values
*/

router.post("/register",(req,res)=>{
    //create a user in the dabase from the req.body
    const user = req.body;
    console.log(user);
    db.none('INSERT INTO users(firstname, lastname,age) VALUES($1,$2,$3)', [user.firstname,user.lastname,user.age])
    .then(()=>{
        let response = {
            addedUser: req
        }
        res.send(response);
    }).catch(error =>{
        res.send("An error occurred: " + error);
    })
})

module.exports = router;