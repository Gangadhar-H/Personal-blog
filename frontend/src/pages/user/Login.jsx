import React, { useState } from 'react'
import { onLoginSubmit } from '../../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice.js';
import GoogleSignInButton from '../../components/GoogleSignInButton.jsx';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let errors = {};
        if (!formData.email.includes("@")) errors.email = "Invalid email format";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);

        try {
            const result = await onLoginSubmit(formData);

            if (result.error) {
                // Fix: Extract the message string from the error object
                const errorMsg = typeof result.error === 'object'
                    ? result.error.message || JSON.stringify(result.error)
                    : result.error;
                setErrorMessage(errorMsg);
            } else {
                console.log("Login successful!", result);
                dispatch(loginSuccess(result.loggedInUser));
                navigate("/");
            }
        } catch (error) {
            // Fix: Make sure error message is always a string
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
            setErrorMessage(errorMsg);
        }
        setLoading(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

                {/* Fix: Ensure errorMessage is always rendered as a string */}
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4 bg-red-50 p-3 rounded">
                        {String(errorMessage)}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-4">
                    <GoogleSignInButton action="login" />
                </div>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login