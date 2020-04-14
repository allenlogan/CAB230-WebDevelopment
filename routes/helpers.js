const express = require('express');
const router = express.Router();

/* GET offences page */
router.get('/offences', function(req, res, next) {
  req.db.from('offence_columns').select('pretty')
  .then((rows) => {
    res.json({"offences" : rows.map(rows => (
      console.log(rows.offences)
    ))})
    })
  .catch((err) => {
    console.log(err);
    res.json({"Error" : true, "Message" : "Error in MySQL query"})
  })
});

/* GET ages page */
router.get('/ages', function(req, res, next) {
  req.db.from('offences').distinct("age")
  .then((rows) => {
    res.json({"ages" : rows.map(rows =>(
      rows.age
  ))})
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message" : "Error in MySQL query"})
  })
});

/* GET areas page */
router.get('/areas', function(req, res, next) {
  req.db.from('areas').select("area")
  .then((rows) => {
    res.json({"area" : rows.map(rows => (
      rows.area
  ))})
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message" : "Error in MySQL query"})
  })
});

/* GET genders page */
router.get('/genders', function(req, res, next) {
  req.db.from('offences').distinct("gender")
  .then((rows) => {
    res.json({"gender" : rows.map(rows => (
    rows.gender
  ))})
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message" : "Error in MySQL query"})
  })
});

/* GET years page */
router.get('/years', function(req, res, next) {
  req.db.from('offences').distinct("year")
  .then((rows) => {
    res.json({"year" : rows.map(rows => (
      rows.year
  ))})
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error": true, "Message" : "Error in MySQL query"})
  })
});

module.exports = router;
