// // // /server/routes/authRoutes.js
// // const passport = require('passport');

// // module.exports = (app) => {
// //   app.get(
// //     '/auth/google',
// //     passport.authenticate('google', {
// //       scope: ['profile', 'email']
// //     })
// //   );

// //   app.get(
// //     '/auth/google/callback',
// //     passport.authenticate('google'),
// //     (req, res) => {
// //       res.redirect('/dashboard'); // Redirect to dashboard after successful login
// //     }
// //   );

// //   app.get('/api/logout', (req, res) => {
// //     req.logout();
// //     res.redirect('/');
// //   });

// //   app.get('/api/current_user', (req, res) => {
// //     res.send(req.user);
// //   });
// // };
// // /server/routes/authRoutes.js
// const authController = require('../controllers/authController');

// module.exports = (app) => {
//   app.get('/auth/google', authController.loginWithGoogle);

//   app.get('/auth/google/callback', authController.googleAuthCallback);

//   app.get('/api/logout', authController.logout);

//   app.get('/api/current_user', authController.getCurrentUser);
// };
// server/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
  
      await user.save();
  
      req.login(user, (err) => {
        if (err) {
          console.error('Error logging in after registration:', err);
          return res.status(500).json({ error: 'Error logging in after registration' });
        }
        res.json({ message: 'Registration successful', user });
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  });

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging in' });
      }
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

module.exports = router;