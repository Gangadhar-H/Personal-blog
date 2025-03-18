import React, { useEffect, useState } from 'react'
import { fetchPosts, fetchUserProfile } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import BlogPostCard from '../components/BlogPostCard';
import { Link } from 'react-router-dom';

function YourBlogs() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const userProfile = await fetchUserProfile();
                setUser(userProfile);

                const allPosts = await fetchPosts();

                const userPosts = allPosts.filter(post => post.author._id === userProfile._id);
                setPosts(userPosts);

                console.log(allPosts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user blogs:", error);
                setLoading(false);
            }
        }
        fetchAllPosts();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Your Blogs</h1>
            {posts.length === 0 ? (
                <p className="text-gray-500">You have not written any blogs yet.</p>
            ) : (
                posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`}>
                        <BlogPostCard
                            title={post.title}
                            description={post.content}
                            createdAt={post.createdAt}
                            showAuthor={false}
                        />
                    </Link>
                ))
            )}
        </div>
    );
}

export default YourBlogs