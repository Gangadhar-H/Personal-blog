import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSinglePost, onPostUpdate } from '../services/api';

function UpdateBlog() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost = await fetchSinglePost(id);
            setPost(fetchedPost);
            setFormData({
                title: fetchedPost.title || "",
                content: fetchedPost.content || ""
            });
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = await onPostUpdate(id, formData);
        console.log("Updated", updatedPost);
        navigate(`/post/${id}`);
    }


    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Update Blog</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Content:</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full mt-1 p-2 border rounded-lg"
                        ></textarea>
                    </div>



                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg">
                        Update Blog
                    </button>
                </form>

                <button
                    onClick={() => navigate(-1)}
                    className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UpdateBlog