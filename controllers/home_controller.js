const Post = require("../models/post");

module.exports.home = async function(req, res){
    let posts = await Post.find({}).populate('user');
    
    return res.render('home', {
        title: "Home Page",
        posts: posts
    });
}