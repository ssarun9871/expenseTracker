const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('expense_tracker', 'root',process.env.DB_password,{
    dialect:"mysql",
    host:'localhost',
    define: { 
        timestamps: false
      }
})
module.exports = sequelize;