import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { logoutSuccess } from '../../redux/authSlice';
import { onLogoutSubmit } from '../../services/api';

function ProfilePage() {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();


    const handleLogout = async () => {
        await onLogoutSubmit();
        dispatch(logoutSuccess());
        navigate("/login");
    }

    return (
        <div className="relative">
            {/* Profile Icon (Click to toggle dropdown) */}
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
                <span role="img" aria-label="profile">👤</span>
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2  bg-white shadow-lg rounded-lg p-4 border z-20 h-fit w-fit">
                    {user ? (
                        <>
                            <p className="text-gray-800 font-semibold">{user?.username}</p>
                            <p className="text-gray-600 text-sm">{user?.email}</p>
                            <hr className="my-2" />
                            <button className="text-blue-600 text-sm w-full text-left hover:underline">
                                Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-red-600 text-sm w-full text-left hover:underline mt-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfilePage