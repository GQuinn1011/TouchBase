module.exports = function(sequelize, DataTypes) {
    var Chat = sequelize.define("sequelize_chatroom_db", {
        username: DataTypes.STRING,
        message: DataTypes.STRING
    });
    return Chat;
};