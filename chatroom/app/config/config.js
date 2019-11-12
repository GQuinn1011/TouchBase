require("dotenv").config();

module.exports = {
    "development": {
        "username": "root",
        "password": process.env.MYSQL_KEY,
        "database": "chatroom_db",
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": process.env.MYSQL_KEY,
        "database": "chatroom_db",
        "host": "localhost",
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
}