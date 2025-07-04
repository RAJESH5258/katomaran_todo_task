const jwt = require('jsonwebtoken'); 
 
module.exports = (req, res, next) => {   const authHeader = req.headers['authorization'];   const token = authHeader && authHeader.split(' ')[1];      if (!token) return res.status(401).json({ message: 'Access denied' }); 
 
  try {     const decoded = jwt.verify(token, process.env.JWT_SECRET);     req.userId = decoded.id;     next();   } catch (err) {     res.status(403).json({ message: 'Invalid token' });   } };