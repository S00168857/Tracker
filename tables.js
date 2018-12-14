const db = require('./suquelize')
const Sequelize = require('sequelize');//Reference the sequelize package

// module.exports.User = db.define('User', { // Create table called user (sequelize.define makes table)
//     username: Sequelize.STRING, //sequelize.string is defining type
//     birthday: Sequelize.DATE
// });



module.exports.User = db.define('Geolocation_Tbl', { // Create table called user (sequelize.define makes table)
    Device_ID: { type: Sequelize.INTEGER, primaryKey: true }, //sequelize.string is defining type
    User_ID: Sequelize.INTEGER,
    Date_Time_Recorded: { type: Sequelize.DATE, primaryKey: true },
    Latitude: Sequelize.DECIMAL(9, 6),
    Longitude: Sequelize.DECIMAL(9, 6)

}, { freezeTableName: true, timestamps: false });
