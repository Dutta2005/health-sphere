import { Router } from "express";
import { 
   createPost, 
   getAllPosts, 
   getPostById, 
   getPostsByOrganizationId,
   editPost, 
   deletePost
} from "../controllers/orgPost.controller.js";
import { verifyJWT } from "../middlewares/org.middleware.js";

const router = Router();

router.use(verifyJWT);

// /api/v1/org-posts
router.post("/create", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/organization/:id", getPostsByOrganizationId);
router.patch("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);

export default router;