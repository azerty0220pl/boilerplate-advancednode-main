'use strict';
require('dotenv').config();
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const { ObjectID } = require('mongodb');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  //myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    done(null, null);
  //});
});

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  res.render('index', {title: 'Hello', message: 'Please log in'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
