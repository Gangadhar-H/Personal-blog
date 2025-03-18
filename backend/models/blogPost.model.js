import mongoose, { Schema } from "mongoose";

const blogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Index for better query performance
blogPostSchema.index({ title: 1 }, { unique: false });


const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
