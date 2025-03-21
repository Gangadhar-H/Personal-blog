import React, { useState } from 'react'
import { onRegisterSubmit } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice.js';
import { auth, googleProvider, signInWithPopup } from '../firebaseConfig.js';

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        username: '',
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        let errors = {};
        if (!formData.username.trim()) errors.username = "Username is required";
        if (!formData.email.includes("@")) errors.email = "Invalid email format";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        return errors;
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const token = await result.user.getIdToken();
            console.log("Firebase Token: ", token);

            const response = await fetch("http://localhost:5000/api/v1/user/firebase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, provider: "google" }),
                credentials: "include", // Allows cookies to be set from the backend
            });

            const data = await response.json();
            console.log("Backend Response:", data.loggedInUser);

            dispatch(loginSuccess(data.loggedInUser));

            if (response.ok) {
                navigate("/");
                window.location.reload;
            }

        } catch (error) {
            console.error("Google Login Error:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("Registration Data:", formData);
        const result = await onRegisterSubmit(formData);

        if (result.error) {
            console.error("Failed to create post:", result.error);
        } else {
            console.log("Post created successfully!");
            navigate("/login");
        }

        setErrors({});
        setSuccess(true);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

                {success && <p className="text-green-600 text-center mb-4">Registration successful!</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter username"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <button onClick={handleGoogleLogin}>Sign up with Google</button>
            </div>
        </div>
    )
}

export default Register