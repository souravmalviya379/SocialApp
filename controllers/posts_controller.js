const Post = require("../models/post")

module.exports.create = async function(req, res){
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('Post created successfully !!');
        return res.redirect('back');

    } catch (error) {
        console.log('Error in creating post : ', error);    
    }
}