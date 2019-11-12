var Chat = require("../models/chat.js");
module.exports = function(app) {
    app.get("/api/chat", function(req, res) {
        Chat.findAll({}).then(function(results) {
            res.json(results);
        })
    })

    app.post("/api/chat",
        function(req, res) {
            console.log("Chat Log:");
            console.log(req.body);

            Chat.create({
                user: req.body.user,
                message: req.body.message,
                created_at: req.body.created_at
            }).then(function(results) {
                res.end();
            })
        })
}