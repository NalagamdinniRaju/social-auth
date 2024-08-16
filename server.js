// // // // /server/server.js
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cookieSession = require('cookie-session');
// // // const passport = require('passport');
// // // const keys = require('./config/keys');
// // // require('./models/User');
// // // require('./services/passport');

// // // mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // // const app = express();

// // // app.use(
// // //   cookieSession({
// // //     maxAge: 30 * 24 * 60 * 60 * 1000,
// // //     keys: [keys.cookieKey]
// // //   })
// // // );

// // // app.use(passport.initialize());
// // // app.use(passport.session());

// // // require('./routes/authRoutes')(app);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT);
// // // /server/server.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cookieSession = require('cookie-session');
// // const passport = require('passport');
// // const keys = require('./config/keys');
// // require('./models/User');
// // require('./services/passport');

// // mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// // .then(() => console.log('Connected to MongoDB'))
// // .catch(err => console.error('Error connecting to MongoDB:', err));


// // const app = express();

// // app.use(
// //   cookieSession({
// //     maxAge: 30 * 24 * 60 * 60 * 1000,
// //     keys: [keys.cookieKey]
// //   })
// // );

// // app.use(passport.initialize());
// // app.use(passport.session());

// // require('./routes/authRoutes')(app);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost${PORT}`)
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
// const passport = require('passport');

// // Load User model and passport configuration
// require('./models/User');
// require('./services/passport');

// // MongoDB URI and other keys
// const MONGO_URI = 'mongodb+srv://NRSRaju:Raju9398@cluster0.fpqjv.mongodb.net/auth-data?retryWrites=true&w=majority&appName=Cluster0';
// const COOKIE_KEY = 'your_cookie_key';

// // Initialize Express app
// const app = express();

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Set up cookie session
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     keys: [COOKIE_KEY]
//   })
// );

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Set up routes
// require('./routes/authRoutes')(app);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('./models/User');
require('./services/passport');


const app = express();

app.use(express.json());
app.use(cors());
// MongoDB URI and other keys
const MONGO_URI = 'mongodb+srv://NRSRaju:Raju9398@cluster0.fpqjv.mongodb.net/auth-data?retryWrites=true&w=majority&appName=Cluster0';
const COOKIE_KEY = 'your_cookie_key';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});