// /server/controllers/authController.js
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('users');

module.exports = {
  loginWithGoogle: passport.authenticate('google', {
    scope: ['profile', 'email']
  }),

  googleAuthCallback: (req, res) => {
    passport.authenticate('google', {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    })(req, res);
  },

  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },

  getCurrentUser: (req, res) => {
    res.send(req.user);
  }
};