const express = require('express');
const router = express.Router();
var app = express();


/* POST Register page*/
router.post('/register', function(req,res){
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Error creating account' });
  } else {
    const user = {
      "email":req.body.email,
      "password":req.body.password
    };
    console.log("User name ="+req.body.email+", password ="+req.body.password);
    req.db('users').whereNotExists(user).insert(user)
    .then(_ => {
      res.status(201).json({ message: "Account successfully registered"});
    })
    .catch(error => {
      res.status(500).json({ message: "Account "})
    })}
})

/* POST login page*/
router.post('/login', function(req,res){
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Error siging into account' });
  } else {
    const user = {
      "email":req.body.email,
      "password":req.body.password
    };
    console.log("User name ="+req.body.email+", password ="+req.body.password);
    req.db('users').whereNotExists(user).insert(user)
    .then(_ => {
      res.status(201).json({ message: "Account successfully registered"});
    })
    .catch(error => {
      res.status(500).json({ message: "Account "})
    })}
})

module.exports = router;
