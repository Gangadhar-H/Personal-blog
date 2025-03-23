import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BlogPostCard from '../../components/BlogPostCard'
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchPosts } from '../../services/api';


function BlogPostList() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allBlogs = async () => {
            const blogs = await fetchPosts();
            setPosts(blogs);
            setLoading(false);
        }
        allBlogs();
    }, []);

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Latest Blog Posts</h1>
            <div className="space-y-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id}>
                            <Link to={`/post/${post._id}`}>
                                <BlogPostCard
                                    title={post.title}
                                    description={post.content}
                                    author={post.author?.username || "Unknown"}
                                    createdAt={post.createdAt}
                                    showAuthor={true}
                                    showLikes={post.likes.length}
                                />
                                <hr />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No blog posts available.</p>
                )}
            </div>
        </div>
    )
}

export default BlogPostList