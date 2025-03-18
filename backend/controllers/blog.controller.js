import { asyncHandler } from "../utils/asyncHandler.js";
import BlogPost from "../models/blogPost.model.js"

const getPosts = asyncHandler(async (req, res) => {
    // const posts = await BlogPost.find().populate("author");
    const posts = await BlogPost.find().populate("author", "username");
    if (!posts) {
        return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(posts);
});

const getSinglePost = asyncHandler(async (req, res) => {
    const post = await BlogPost.findById(req.params.id).populate("author");
    if (!post) {
        return res.status(404).json({ message: "No such blog found" });
    }
    res.status(200).json(post);
});


const createPost = asyncHandler(async (req, res) => {

    const user = req.user;
    const newBlogPost = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        author: user._id,
    });

    newBlogPost.save();

    if (!newBlogPost) {
        return res.status(500).json({ Message: "Something went wrong" });
    }

    res.status(201).json(newBlogPost);

});

const updatePost = asyncHandler(async (req, res) => {
    const user = req.user;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Ensure the user is the author of the post
    if (user._id.toString() !== post.author.toString()) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    const blogPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!blogPost) {
        return res.status(500).json({ Message: "Something went wrong" });
    }
    res.status(200).json(blogPost);
});

const deletePost = asyncHandler(async (req, res) => {
    const user = req.user;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Ensure the user is the author of the post
    if (user._id.toString() !== post.author.toString()) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    // Delete the post
    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
});

const checkAuthor = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Ensure the user is the author of the post
    if (user._id.toString() !== post.author.toString()) {
        return res.status(401).json({ message: "Unauthorized access" });
    }


    res.status(200).json({ message: "Authorized user" });
});



export {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    checkAuthor
}
