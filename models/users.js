const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const users = sequelize.define('users',{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        
    },
    email:{
        type:Sequelize.STRING,
        primaryKey : true 
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = users;