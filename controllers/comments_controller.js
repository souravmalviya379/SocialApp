const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment added to post !!');   
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', 'Error while adding comment !!');
        console.log('Error in creating comment : ', err); return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        let commentId = req.params.id;
        let comment = await Comment.findById(commentId);
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();
            //removing comment from post
            await Post.findByIdAndUpdate(postId, {$pull: {comments: commentId}});

            //destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            req.flash('success', 'Comment deleted !!');
            return res.redirect('back');
        }else{
            //if user is not authorized then send back to same page without deleting comment
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error in deleting comment : ', error);
        req.flash('error', 'Cannot delete Comment !!');
        return;
    }
}