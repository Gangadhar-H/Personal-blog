import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser, logoutUser, registerUser, refreshAccessToken, getUserProfile, verifyFirebaseUser, updateUserProfile } from "../controllers/user.controller.js";

const router = Router();

router.route("/firebase").post(verifyFirebaseUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/me").get(verifyJWT, getUserProfile);
router.route("/profile/update").put(verifyJWT, updateUserProfile);

router.route("/refresh-token").post(verifyJWT, refreshAccessToken);


export default router;
