// Setup basic express server
var express = require("express");
var app = express();
var path = require("path");
var http = require("http").createServer(app);
var io = require("socket.io")(http); // Can be either http, server
var PORT = process.env.PORT || 3000;

// Routing
app.use(express.static(path.join(__dirname, "public")));

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

// console.log("total Users online: " + numUsers);

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
});

// TODO Heroku
// https://stackoverflow.com/questions/25013735/socket-io-nodejs-doesnt-work-on-heroku

// Private Message
// https://stackoverflow.com/questions/11356001/socket-io-private-message

// Creating Rooms
// https://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io


// Get the client's IP address in socket.io
// io.sockets.on('connection', function (socket) {
//     var socketId = socket.id;
//     var clientIp = socket.request.connection.remoteAddress;
  
//     console.log(clientIp);
//   });