/* IMPORT CAT.JS TO USE ITS DB FUNCTIONS */
var express = require("express");
var router = express.Router();
var cat = require("../models/cat.js");

/* MAINSCREEN ROUTE */
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("mainscreen", hbsObject);
  });
});

/* STATISTICS ROUTE */
router.get("/statistics", (req, res) => {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("statistics", hbsObject);
  });
});

router.post("/api/cats", function(req, res) {
  cat.create(["name", "sleepy"], [req.body.name, req.body.sleepy], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  cat.update(
    {
      sleepy: req.body.sleepy
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

/* EXPORT ROUTES FOR SERVER.JS */
module.exports = router;
