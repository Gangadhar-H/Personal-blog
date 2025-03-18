import React from "react";

const BlogPostCard = ({ title, description, author, createdAt, showAuthor = true }) => {
    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-2xl mx-auto border border-gray-200">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
                <p className="text-gray-600 line-clamp-3">{description}</p>
                <div className="mt-5 flex justify-between items-center text-sm text-gray-500">
                    {showAuthor && (
                        <span className="font-medium text-gray-700">👤 {author || "Unknown"}</span>
                    )}
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>


    );
};

export default BlogPostCard;
