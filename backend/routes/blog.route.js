import { Router } from "express";
import { checkAuthor, createPost, deletePost, getPosts, getSinglePost, toggleLike, updatePost } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/posts").get(getPosts);
router.route("/").post(verifyJWT, createPost);
router.route("/posts/:id").delete(verifyJWT, deletePost);
router.route("/posts/:id").get(getSinglePost);
router.route("/posts/:id").put(verifyJWT, updatePost);
router.route("/posts/:id/likes").post(verifyJWT, toggleLike);
router.route("/posts/checkAuthor/:id").get(verifyJWT, checkAuthor);

export default router;
