const express = require('express'); const passport = require('passport'); const jwt = require('jsonwebtoken'); const router = express.Router(); const authController = require('../controllers/authController'); 
 
// OAuth Routes 
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); router.get('/google/callback',    passport.authenticate('google', { failureRedirect: '/login' }),   (req, res) => {     const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });     res.redirect(`${process.env.CLIENT_URL}/oauth?token=${token}`);   } ); 
 
router.get('/github', passport.authenticate('github', { scope: ['user:email'] })); router.get('/github/callback',    passport.authenticate('github', { failureRedirect: '/login' }),   (req, res) => {     const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });     res.redirect(`${process.env.CLIENT_URL}/oauth?token=${token}`);   } ); 
 
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] })); router.get('/facebook/callback',    passport.authenticate('facebook', { failureRedirect: '/login' }),   (req, res) => {     const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });     res.redirect(`${process.env.CLIENT_URL}/oauth?token=${token}`);   } ); 
 
// User Routes 
router.get('/user', authController.getUser); router.get('/logout', (req, res) => {   req.logout();   res.redirect(process.env.CLIENT_URL); }); 
 
module.exports = router; 