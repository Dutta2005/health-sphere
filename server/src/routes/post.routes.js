import { Router } from "express";
import { 
    createPost, 
    getAllPosts, 
    getPostById, 
    getPostsByUserId,
    editPost, 
    deletePost
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

// /api/v1/posts
router.post("/create", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:id", getPostsByUserId);
router.patch("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);

export default router;