const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
                .sort('-createdAt')
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                });

    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    })
}


// module.exports.create = async function(req, res){
//     try {
//         await Post.create({
//             content: req.body.content,
//             user: req.user._id
//         });

//         console.log('Post created successfully !!');
//         return res.status(200).json({
//             message: 'Post added !!'
//         });

//     } catch (error) {
//         console.log('Error while creating post : ', error);   
//         return res.status(500).json({
//             message: 'Internal Server error !!'
//         }); 
//     }
// }


module.exports.destroy = async function(req, res){
    try {
        let postId = req.params.id;
        console.log(postId)
        let post = await Post.findById(postId);
        if(post.user == req.user.id){
            post.remove();
            //deleting comments
            await Comment.deleteMany({post: postId});

            return res.status(200).json({
                message: 'Post and associated comments deleted successfully !!'
            })
        }else{
            return res.status(401).json({
                message: 'You are not authorized to delete this post !!'
            })
        }
    } catch (err) {
        console.log('Error in deleting post : ', err);
        return res.status(500).json({
            message: 'Internal server error !!'
        })
    }
}