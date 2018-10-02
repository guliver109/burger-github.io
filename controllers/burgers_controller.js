var express = require("express");

var router = express.Router();

// Import burger file to use
var burger = require("../models/burger.js");

// Create all routes
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burger: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/burger", function(req, res) {
    burger.insertOne(["burger_name"],[req.body.burger_name], 
    function(result) {
      // Send back the ID of the new quote
      //res.json({ id: result.insertId });
      res.redirect('/');
    });
  });
  
  router.put("/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne(
      {
        //name: req.body.devoured,
        devoured: true
      },
      condition,function(result) {
        //if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          //return res.status(404).end();
        //}
        res.redirect('/');
  
      });
  });
  //delete burgers
  router.delete("api/burger/:id", function(req, res){
    var condition = "id = " + req.params.id;
    
    burger.deleteOne([condition], function(){
    res.redirect('/');
    });
  });
  // Export routes for server.js to use.
  module.exports = router;