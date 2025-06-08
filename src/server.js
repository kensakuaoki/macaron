const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Placeholder OAuth strategies
if (process.env.TWITTER_CONSUMER_KEY) {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
  }, function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));
}

if (process.env.INSTAGRAM_CLIENT_ID) {
  passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: '/auth/instagram/callback',
  }, function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));
}

// Auth routes
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// Simple in-memory item store
const items = [];
let idCounter = 1;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'login required' });
}

// Add item
app.post('/api/items', ensureAuthenticated, (req, res) => {
  const item = {
    id: idCounter++,
    user: req.user.username || req.user.id,
    type: req.body.type, // give or want
    name: req.body.name,
    category: req.body.category,
    tags: req.body.tags || [],
  };
  items.push(item);
  res.json(item);
});

// List items
app.get('/api/items', (req, res) => {
  res.json(items);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
