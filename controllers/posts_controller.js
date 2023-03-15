const Post = require("../models/post")
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    console.log(req.body)
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('Post created successfully !!');
        req.flash('success', 'Post added !!');
        return res.redirect('back');

    } catch (error) {
        req.flash('error', 'Could not post !!');
        console.log('Error while creating post : ', error);   
        return res.redirect('back'); 
    }
}

module.exports.destroy = async function(req, res){
    try {
        let postId = req.params.id;
        console.log(postId)
        let post = await Post.findById(postId);
        if(post.user == req.user.id){
            post.remove();
            //deleting comments
            await Comment.deleteMany({post: postId});

            req.flash('success', 'Post and associated Comments deleted !!');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting post : ', err);
        req.flash('error', 'Could not delete comment !!');
        return res.redirect('back');
    }
}