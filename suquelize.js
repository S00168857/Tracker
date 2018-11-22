const Sequelize = require('sequelize');//Reference the sequelize package
const sequelize = new Sequelize('3rdYearproject', 'Administrator', 'Administrator', { //*database*username*password
    host: 'year3project.ceryng3iqugy.eu-west-1.rds.amazonaws.com',//URL to db
    dialect: 'mysql',//syntax

    pool: {//max connections
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

// Sequelize.prototype.makeStuff = () => {
/* Create table */
// const User = sequelize.define('User', { // Create table called user (sequelize.define makes table)
//     username: Sequelize.STRING, //sequelize.string is defining type
//     birthday: Sequelize.DATE
// });

// //data for table
// sequelize.sync() //connects to db
//     .then(() => User.create({ //.then goes onto do work
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     }))
//     .then(jane => {
//         console.log(jane.toJSON());//informs of what was done
//     });

module.exports = sequelize