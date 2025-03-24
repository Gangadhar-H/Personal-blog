import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/api'; // API call to update user profile
import { updateUser } from '../../redux/authSlice'; // Redux action to update user in state

function EditProfile() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || '',
        bio: user?.bio || '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { ...formData };
            const updatedUser = await updateProfile(updatedData); // Call API to update profile
            dispatch(updateUser(updatedUser.user)); // Update Redux state with new user data
            navigate('/profile'); // Navigate back to Profile Page
        } catch (error) {
            setError('Failed to update profile. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-gray-700 font-medium">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            rows="4"
                            placeholder="Write a short bio about yourself..."
                        ></textarea>
                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>

                <button
                    onClick={() => navigate('/profile')}
                    className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditProfile;
