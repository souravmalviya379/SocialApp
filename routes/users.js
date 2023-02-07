const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/', usersController.myprofile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create-session',
            passport.authenticate(
                'local', 
                {failureRedirect: '/users/sign-in'}
            ),
            usersController.createSession);
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);
router.get('/profile/:id', usersController.profile);
router.post('/update/:id', usersController.update);

router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));

router.get('/auth/google/callback', passport.authenticate(
        'google',
        {failureRedirect: '/users/sign-in'},
    ),
    usersController.createSession
)



module.exports = router;