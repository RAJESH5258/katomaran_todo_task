const jwt = require('jsonwebtoken'); const { User } = require('../models'); 
 
exports.getUser = async (req, res) => {   try {     const user = await User.findByPk(req.userId, {       attributes: { exclude: ['provider_id', 'created_at', 'updated_at'] }     });     res.json(user);   } catch (err) {     res.status(500).json({ message: err.message });   } }; 