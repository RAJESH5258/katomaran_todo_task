const { DataTypes } = require('sequelize'); const sequelize = require('../config/database'); 
 
const Task = sequelize.define('Task', {   title: {     type: DataTypes.STRING,     allowNull: false   },   description: {     type: DataTypes.TEXT   },   status: {     type: DataTypes.ENUM('pending', 'in_progress', 'completed'),     defaultValue: 'pending'   },   due_date: {     type: DataTypes.DATE   },   user_id: {     type: DataTypes.INTEGER,     allowNull: false   } }, {   tableName: 'tasks',   timestamps: true,   createdAt: 'created_at',   updatedAt: 'updated_at' }); 
 
module.exports = Task;