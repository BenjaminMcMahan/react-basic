const express = require('express');
const mongoose = require('./db');
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cors = require('cors');
require('dotenv').config();

// Initialize Express App
const app = express();

// CORS setup
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// Initialize connection to Mongoose Atlas
const connection = mongoose.connection;

// JWT options for Passport
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};
passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        // Your authentication logic goes here
        // If the authentication is successful, call done(null, user)
        // If the authentication fails, call done(null, false)
    })
);

app.use(passport.initialize({}));
connection.once('open', () => {
    console.log('Mongoose connection established successfully!');
});

connection.on('error', (error) => {
    console.error(error);
});

app.get('/', (req, res) => {
    res.send({data: 'Hello from the backend!'});
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});