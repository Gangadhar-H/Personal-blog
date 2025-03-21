import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../redux/authSlice";

const useGoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleLogin = async (action) => {
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

    return { handleGoogleLogin };

}
export default useGoogleLogin;