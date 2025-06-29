const { DataTypes } = require('sequelize'); const sequelize = require('../config/database'); 
 
const User = sequelize.define('User', {   email: {     type: DataTypes.STRING,     allowNull: false,     unique: true,     validate: {       isEmail: true     }   },   name: {     type: DataTypes.STRING   },   provider: {     type: DataTypes.STRING,     allowNull: false   },   provider_id: {     type: DataTypes.STRING,     allowNull: false   } }, {   tableName: 'users',   timestamps: true,   createdAt: 'created_at',   updatedAt: 'updated_at' }); 
 
module.exports = User;