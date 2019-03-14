//Model of table for db
const db = require('./suquelize')
const Sequelize = require('sequelize');//Reference the sequelize package

module.exports.User = db.define('Geolocation_Tbl', { // Exports data to the Geolocation table
    Device_ID: { type: Sequelize.INTEGER, primaryKey: true }, //sequelize.int is defining the type of data
    User_ID: Sequelize.INTEGER,
    Date_Time_Recorded: { type: Sequelize.DATE, primaryKey: true },
    Latitude: Sequelize.DECIMAL(9, 6),
    Longitude: Sequelize.DECIMAL(9, 6)

}, { freezeTableName: true, timestamps: false });
