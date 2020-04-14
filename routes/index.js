const express = require('express');
const router = express.Router();
const mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Queensland Criminal Offences Homepage' });
});

/* GET search page */
router.get("/search/offence", function(req,res, next) {
  var query = "SELECT offence FROM ??";
  var table = ["offence"];
  query = mysql.format(query,table);
  req.db(query, function(err,rows) {
  if (err) {
    res.json({"Error" : true, "Message" : "Error in MySQL query"});
}
  else {
  res.json({"Error" : true, "Message" : "Error in MySQL query"});
  }
});
});

module.exports = router;
