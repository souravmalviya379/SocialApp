const express = require('express');
const passport = require('passport');
const router = express.Router();
const postsAPI = require('../../../controllers/api/v1/posts_api');

router.get('/', postsAPI.index);
router.delete('/destroy/:id', passport.authenticate('jwt', {session: false}), postsAPI.destroy);

module.exports = router;