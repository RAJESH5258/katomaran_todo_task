const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy; 
const FacebookStrategy = require('passport-facebook').Strategy; 
const { User } = require('../models');

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser(async (id, done) => { const user = await User.findByPk(id); done(null, user); });

// Google Strategy 
passport.use(new GoogleStrategy({ 
  clientID: process.env.GOOGLE_CLIENT_ID, 
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  callbackURL: '/auth/google/callback' }, 
  async (accessToken, refreshToken, profile, done) => { const [user] = await User.findOrCreate({ where: { provider: 'google', provider_id: profile.id }, defaults: { email: profile.emails[0].value, name: profile.displayName } }); done(null, user); }));

// GitHub Strategy 
passport.use(new GitHubStrategy({ clientID: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET, callbackURL: '/auth/github/callback' }, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0]?.value || `${profile.username}@github.com`; const [user] = await User.findOrCreate({ where: { provider: 'github', provider_id: profile.id }, defaults: { email, name: profile.displayName || profile.username } });
  done(null, user);
}));

// Facebook Strategy 
passport.use(new FacebookStrategy({ clientID: process.env.FACEBOOK_APP_ID, clientSecret: process.env.FACEBOOK_APP_SECRET, callbackURL: '/auth/facebook/callback', profileFields: ['id', 'emails', 'name', 'displayName'] }, async (accessToken, refreshToken, profile, done) => { const [user] = await User.findOrCreate({ where: { provider: 'facebook', provider_id: profile.id }, defaults: { email: profile.emails?.[0]?.value, name: profile.displayName } }); done(null, user); })); 