const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense_tracker', 'root', '1234',{
    dialect:"mysql",
    host:'localhost',
    define: {
        timestamps: false
      }
})
module.exports = sequelize;