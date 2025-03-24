import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const user = useSelector((state) => state.auth.user); // Get user data from Redux store

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
                <div className="flex items-center space-x-4">
                    {/* Profile Picture */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                <span className="text-3xl">{user?.username?.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{user?.username}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800">Bio:</h3>
                    <p className="mt-2 text-gray-600">{user?.bio || "You haven't set a bio yet."}</p>
                </div>

                {/* Buttons Section */}
                <div className="mt-8 flex justify-between items-center">
                    <Link
                        to="/edit-profile"
                        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to="/"
                        className="bg-gray-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
