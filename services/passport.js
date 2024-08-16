// // // /server/services/passport.js
// // const passport = require('passport');
// // const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const mongoose = require('mongoose');
// // const keys = require('../config/keys');

// // const User = mongoose.model('users');

// // passport.serializeUser((user, done) => {
// //   done(null, user.id);
// // });

// // passport.deserializeUser((id, done) => {
// //   User.findById(id).then(user => {
// //     done(null, user);
// //   });
// // });

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: keys.googleClientID,
// //       clientSecret: keys.googleClientSecret,
// //       callbackURL: '/auth/google/callback',
// //     },
// //     async (accessToken, refreshToken, profile, done) => {
// //       const existingUser = await User.findOne({ googleId: profile.id });

// //       if (existingUser) {
// //         return done(null, existingUser);
// //       }

// //       const user = await new User({
// //         googleId: profile.id,
// //         firstName: profile.name.givenName,
// //         lastName: profile.name.familyName,
// //         email: profile.emails[0].value
// //       }).save();
// //       done(null, user);
// //     }
// //   )
// // );
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');

// const User = mongoose.model('users');

// // Replace the following with your actual credentials
// const GOOGLE_CLIENT_ID = '694840403615-m4rmlc46fcm02fqdvbqmjol2ssataspn.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });

//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const user = await new User({
//         googleId: profile.id,
//         firstName: profile.name.givenName,
//         lastName: profile.name.familyName,
//         email: profile.emails[0].value
//       }).save();
//       done(null, user);
//     }
//   )
// );
// server/services/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const GOOGLE_CLIENT_ID = '694840403615-m4rmlc46fcm02fqdvbqmjol2ssataspn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const user = await new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);