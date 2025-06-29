require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const passport = require('passport'); 
const session = require('express-session'); 
const { sequelize } = require('./models'); 
const authRoutes = require('./routes/auth'); 
const taskRoutes = require('./routes/tasks'); 
 
require('./config/passport'); 
 
const app = express(); 
 
// Middleware 
app.use(cors({   origin: process.env.CLIENT_URL,   credentials: true })); app.use(express.json()); app.use(session({   secret: process.env.SESSION_SECRET,   resave: false,   saveUninitialized: true })); app.use(passport.initialize()); app.use(passport.session()); 
 
// Test DB connection 
sequelize.authenticate()   .then(() => console.log('Database connected...'))   .catch(err => console.log('Error: ' + err)); 
 
// Sync models 
sequelize.sync({ alter: true })   .then(() => console.log('Models synced...'))   .catch(err => console.log('Error: ' + err)); 
 
// Routes 
app.use('/auth', authRoutes); app.use('/api/tasks', taskRoutes); 
 
// Error handling 
app.use((err, req, res, next) => {   console.error(err.stack);   res.status(500).send('Something broke!'); 
}); 
 
const PORT = process.env.PORT || 5000; app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
 