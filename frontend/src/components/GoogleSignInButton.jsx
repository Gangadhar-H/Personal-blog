import { FcGoogle } from "react-icons/fc"; // Google Icon
import useGoogleLogin from '../utils/handleGoogleLogin'; // Reused function

const GoogleSignInButton = ({ action }) => {
    const { handleGoogleLogin } = useGoogleLogin();
    return (
        <button
            onClick={() => handleGoogleLogin(action)}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-2 w-full sm:w-auto hover:bg-gray-100 transition-all duration-200"
        >
            <FcGoogle size={24} /> {/* Google Icon */}
            <span className="text-gray-600 font-medium">
                {action === "register" ? "Sign up with Google" : "Sign in with Google"}
            </span>
        </button>
    );
};

export default GoogleSignInButton;
