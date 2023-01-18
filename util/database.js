const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_database, process.env.DB_user,process.env.DB_password,{
    dialect:"mysql",
    host:process.env.DB_host,
    define: { 
        timestamps: false
      }
})
module.exports = sequelize;