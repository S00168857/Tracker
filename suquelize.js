const Sequelize = require('sequelize');//Reference the sequelize package
const sequelize = new Sequelize('3rdYearProject', 'Administrator', 'Administrator', { //*database*username*password
    host: 'year3project.ceryng3iqugy.eu-west-1.rds.amazonaws.com',//Connection to db
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
module.exports = sequelize