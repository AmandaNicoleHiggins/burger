// Require express
var express = require("express");
// Require express
var router = express.Router();
// Import the burger model 
var burger = require("../models/burger.js");

// Create all of the routes required for the application

// Get

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
        });
    });

// post 

router.post("/api/burgers", function(req,res) {
    console.log(req.body);
    burger.create([
        "burgerName", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        console.log(result);
        res.json({ id: result.insertId });
    });
   });

    // update 

    router.put("/api/burgers/:id", function(req, res) {
        var condition = "id = " + req.params.id;
 
        console.log("condition", condition);
 
        burger.update({
            devoured: req.body.devoured
        }, condition, function(result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
            });
        });
 
     // delete
 
     router.delete("/api/burgers/:id", function(req, res) {
         var condition = "id = " + req.params.id;
 
         burger.delete(condition, function(result) {
             if (result.affectedRows == 0) {
                  return res.status(404).end();
                 } else {
                     res.status(200).end();
                 }
                 });
             });

module.exports = router;