module.exports = function(sequelize, DataTypes) {
    var Chat = sequelize.define("chat", {
        username: DataTypes.STRING,
        message: DataTypes.STRING
    });
    return Chat;
};