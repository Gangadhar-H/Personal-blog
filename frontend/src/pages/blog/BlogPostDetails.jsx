import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { checkAuthor, toggleLikePost, fetchSinglePost, onPostDelete } from '../../services/api';
import { useSelector } from 'react-redux';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';


function BlogPostDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await fetchSinglePost(id);
            console.log(data);
            setPost(data);
            setLoading(false);
            setLikesCount(data.likes.length);
            setHasLiked(data.likes.includes(user._id));
        }
        fetchPost();

        const fetchUser = async () => {
            if (!id) return;
            const data = await checkAuthor(id);
            setIsAuth(data);
        }
        fetchUser();
    }, [id, user]);


    const handleDelete = async () => {
        const deletedPost = await onPostDelete(id);
        console.log(deletedPost);
        navigate('/');
    }

    const handleToggleLike = async () => {
        try {
            const response = await toggleLikePost(id); // Call toggle like API
            setHasLiked(response.message); // Update like/unlike status (true = liked, false = unliked)
            setLikesCount(response.likeCounts); // Update the like count
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const shareUrl = window.location.href;

    if (loading) return <LoadingSpinner />;
    if (!post) return <p className="text-center text-red-500">Post not found</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col h-screen">

                {loading && <p className="text-center text-gray-600 text-lg flex-grow">Loading...</p>}

                {!loading && !post && (
                    <p className="text-center text-red-500 text-lg flex-grow">Blog post not found.</p>
                )}

                {!loading && post && (
                    <>
                        {/* Blog Content (Expands to take available space) */}
                        <div className="flex-grow">
                            {/* Title */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">{post.title}</h1>

                            {/* Author & Date Row */}
                            <div className="flex justify-between items-center text-gray-600 text-sm mb-6">
                                <p className="font-semibold text-left">👤 {post?.author?.username || "Unknown Author"}</p>
                                <p className="text-right text-xs text-gray-500">
                                    {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown Date"}
                                </p>
                            </div>

                            {/* Content */}
                            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

                            {/* Tags Section (Optional) */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-gray-900 font-semibold mb-2">Tags:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Like Button */}
                        <div className="mt-4 flex items-center gap-4">
                            {user && (

                                <button
                                    onClick={handleToggleLike}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 
                                ${hasLiked ? 'bg-red-500 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
                                >
                                    {hasLiked ? '❤️ Unlike' : '🤍 Like'}
                                </button>
                            )}
                            <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                        </div>

                        {/* Social Share Buttons */}
                        {user && (


                            <div className="flex gap-3">
                                <FacebookShareButton url={shareUrl} quote={post.title} hashtag="#blog">
                                    <FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl" />
                                </FacebookShareButton>

                                <TwitterShareButton url={shareUrl} title={post.title} hashtags={['blog', 'react']}>
                                    <FaTwitter className="text-blue-400 hover:text-blue-600 text-2xl" />
                                </TwitterShareButton>

                                <WhatsappShareButton url={shareUrl} title={post.title}>
                                    <FaWhatsapp className="text-green-500 hover:text-green-700 text-2xl" />
                                </WhatsappShareButton>

                                <LinkedinShareButton url={shareUrl} title={post.title} summary={post.content}>
                                    <FaLinkedin className="text-blue-700 hover:text-blue-900 text-2xl" />
                                </LinkedinShareButton>
                            </div>
                        )}

                        {/* Buttons Section (Stays at Bottom) */}
                        <div className="flex justify-between items-center mt-6 border-t pt-4">
                            <Link
                                to="/"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
                            >
                                ← Back to Home
                            </Link>

                            {isAuth && (
                                <div className="flex gap-4">
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/post/update/${post._id}`} className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300">
                                        Update
                                    </Link>

                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default BlogPostDetails
