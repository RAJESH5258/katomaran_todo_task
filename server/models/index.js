const sequelize = require('../config/database'); const User = require('./user'); const Task = require('./task'); 
 
// Define relationships 
User.hasMany(Task, { foreignKey: 'user_id' }); Task.belongsTo(User, { foreignKey: 'user_id' }); 
 
module.exports = {   sequelize,   User,   Task }; 