const User = require("../models/user");
const fs = require('fs');
const path = require('path');


module.exports.myprofile = function(req, res){
    if(! req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }

    return res.render('profile', {
        title: 'My Profile',
        profile_user:req.user
    });
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

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, (err)=>{
                if(err){console.log('**Multer error : ', err); return;}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    
                    //removing previousely present avatar before adding new one
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //this is saving the path of uploaded file into the avatar field in User
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('error', err);
            console.log('Error while updating profile : ',err);
            return res.redirect('back');
        }
    }else{  
        req.flash('error', 'Unauthorized !!');
        return res.status(401).send('Unauthorized !!');
    }
}