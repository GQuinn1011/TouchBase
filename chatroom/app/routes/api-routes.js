// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the todos
    app.get("/api/chats", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Chat.findAll({}).then(function(dbChat) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbChat);
        });
    });

    // POST route for saving a new todo
    app.post("/api/chat", function(req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property
        db.Chat.create({
            username: req.body.username,
            message: req.body.message
        }).then(function(dbChat) {
            // We have access to the new todo as an argument inside of the callback function
            res.json(dbChat);
        });
    });

    // DELETE route for deleting todos. We can get the id of the todo to be deleted from
    // req.params.id
    app.delete("/api/chats/:id", function(req, res) {
        // Use the sequelize destroy method to delete a record from our table with the
        // id in req.params.id. res.json the result back to the user

        db.Chat.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbChat) {
            res.json(dbChat);
        })
    });

    // PUT route for updating todos. We can get the updated todo data from req.body
    // app.put("/api/chats", function(req, res) {
    //     // Use the sequelize update method to update a todo to be equal to the value of req.body
    //     // req.body will contain the id of the todo we need to update
    //     db.Chat.update({
    //         text: req.body.text,
    //         complete: req.body.complete
    //     }).then(function(dbChat) {
    //         res.json(dbChat);

    //     })
    // });
};