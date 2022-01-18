const sequelize = require('sequelize');
require('dotenv').config({path: '../config/.env'});

const database = new sequelize(
    'MySql',
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host:"localhost",
    dialect:"mysql"
    }
);

database.sync();

module.exports = database;