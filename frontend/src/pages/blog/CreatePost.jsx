import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { onPostSubmit } from '../../services/api.js';

function CreatePost() {

    const navigate = useNavigate();

    const initialState = {
        title: '',
        content: ''
    }

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await onPostSubmit(formData);

        if (result.error) {
            console.error("Failed to create post:", result.error);
        } else {
            console.log("Post created successfully!");
            navigate("/");
            window.location.reload;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
            {/* Title */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter blog title"
                />
            </div>

            {/* Content */}
            <div className="mb-4">
                <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-1">
                    Content:
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    minLength="10"
                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Write your content here..."
                />
            </div>



            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Submit
            </button>
        </form>
    );

}

export default CreatePost