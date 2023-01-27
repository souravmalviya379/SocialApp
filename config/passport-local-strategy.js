const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        //find and establish the identity
        try {
            let user = await User.findOne({email: email});
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            console.log('Error in Sign-in : ', error);
            return;
        }
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done)=>{
    done(null, user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
    try{
        let user = await User.findById(id);
        return done(null, user);   

    }catch(err){
        console.log('Error in finding user --> passport : ', err);return;
    }
});

passport.checkAuthentication = function(req, res, next){
    //if user is signed in, then pass the req to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;