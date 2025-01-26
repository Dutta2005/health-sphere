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

// import { Router } from "express";
// import { 
//     createPost, 
//     getAllPosts, 
//     getPostById, 
//     getMyPosts,
//     getPostsByUserId,
//     editPost, 
//     deletePost
// } from "../controllers/post.controller.js";
// import { verifyJWT as verifyUserJWT } from "../middlewares/auth.middleware.js";
// import { verifyJWT as verifyOrgJWT } from "../middlewares/org.middleware.js";

// const router = Router();

// // Middleware to handle both user and organization authentication
// const authenticateEntity = (req, res, next) => {
//     verifyUserJWT(req, res, (userErr) => {
//         if (!userErr) {
//             req.user = req.user;
//             return next();
//         }
//         verifyOrgJWT(req, res, (orgErr) => {
//             if (!orgErr) {
//                 req.organization = req.organization;
//                 return next();
//             }
//             // If both authentications fail, pass the user error
//             next(userErr || orgErr);
//         });
//     });
// };

// // All routes now protected
// router.post("/create", authenticateEntity, createPost);
// router.get("/", authenticateEntity, getAllPosts);
// router.get("/my-posts", authenticateEntity, getMyPosts);
// router.get("/:id", authenticateEntity, getPostById);
// router.get("/user/:id", authenticateEntity, getPostsByUserId);
// router.patch("/edit/:id", authenticateEntity, editPost);
// router.delete("/delete/:id", authenticateEntity, deletePost);

// export default router;