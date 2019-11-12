// Setup basic express server
var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server); // Can be either http, server
var db = require("./app/models")
var PORT = process.env.PORT || 8080;
var env = process.env.NODE_ENV || "development";
require("../chatroom/app/config/config")[env];
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatroom_db", "root", "Il0ve0scar", {
    host: "localhost",
    dialect: "mysql"
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));

require("./app/routes/api-routes")(app);
// Routing
//app.use(express.static(path.join(__dirname, "public")));

// Chatroom
var numUsers = 0;

io.on("connection", (socket) => {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on("new message", (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: data
        });
        console.log(socket.username + ": " + data);
        writeToDB(socket.username, data);
    });

    // when the client emits 'add user', this listens and executes
    socket.on("add user", (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit("User Joined", {
            username: socket.username,
            numUsers: numUsers
        });
        console.log(socket.username + " has joined!");
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on("typing", () => {
        socket.broadcast.emit("typing", {
            username: socket.username
        });
    });

    // When the client emits 'stop typing', we broadcast it to others
    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing", {
            username: socket.username
        });
    });

    // When the user disconnects.. perform this
    socket.on("disconnect", () => {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit("user left", {
                username: socket.username,
                numUsers: numUsers
            });
        }
        console.log("User " + socket.username + " disconnected");
    });
});

console.log("total Users online: " + numUsers);
// db.sequelize.sync({ force: false }).then 
function start() {
    server.listen(PORT, function() {
        console.log("listening on localhost:" + PORT);
    });
    //         app.listen(PORT, function() {
    //             console.log("App listening on PORT " + PORT);
    //         })
}
start();

function writeToDB(username, data) {
    sequelize.query("insert into chatroom_db.chats (username, message) values ('" + username + "', '" + data + "')", { type: sequelize.QueryTypes.INSERT })
    return false;
}