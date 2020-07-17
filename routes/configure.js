var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var config = require('./config');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: "http://localhost:3000/users/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

exports.verifyUser = (req,res,next) => {
    if(req.session.passport) { 
        next()
    } else {
        res.sendStatus(401);
    }
}