const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy(
    {
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('Error in google-strategy-passport : ', err); return;}

            console.log(profile);
            if(user){
                // if user exist, set this user as req.user
                return done(null, user);
            }else{
                //if user doesn't exist in database, then create new user with random password
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, (err, user)=>{
                    if(err){console.log('Error in creating user -> passport-google-strategy : ', err); return;}

                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;