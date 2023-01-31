const User = require("../models/user");

module.exports.myprofile = function(req, res){
    if(! req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }

    return res.render('profile', {title: 'My Profile'});
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users');
    }

    return res.render('sign-up', {title: 'Sign-Up Page'});
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users');
    }

    return res.render('sign-in', {title: 'Sign-In Page'});
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){ console.log('Error in finding user in signing up'); return;}       //this msg will be shown when error occurs in database

        if(!user){                      //if user is not found then sign up
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user while signing up!'); return;}
                
                req.flash('success', 'You Registered successfully !!');
                return res.redirect('/users/sign-in');
            })
        }else{
            // req.flash('error', 'Error in Signup');
            res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in !!');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    return req.logout((err)=>{
        if(err){return next(err);}

        return res.redirect('/');
    })
}

module.exports.profile = async function(req, res){
    let id = req.params.id;
    let user = await User.findById(id);

    return res.render('profile', {
        profile_user: user,
        title: "Profile Page"
    });
}
