// // /server/models/User.js
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   googleId: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   password: String, // if email/password auth is used
// });

// mongoose.model('users', userSchema);
// server/models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

mongoose.model('User', userSchema);