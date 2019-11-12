var Sequelize = require("sequelize");
require("dotenv").config();

var sequelize = new Sequelize("sequelize_chatroom_db", "root", process.env.MYSQL_KEY, {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});
module.exports = sequelize;