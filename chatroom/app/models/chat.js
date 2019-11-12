var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Chat = sequelize.define("chats", {
    user: Sequelize.STRING,
    message: Sequelize.STRING,
    created_at: Sequelize.DATE
})
Chat.sync();
module.exports = Chat;