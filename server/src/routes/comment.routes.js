// import { Router } from 'express';
// import {
//     getComments,
//     addComment,
//     updateComment,
//     deleteComment
// } from '../controllers/comment.controller.js';
// import { verifyJWT } from '../middlewares/auth.middleware.js';

// const router = Router();

// // /api/v1/comments

// router.use(verifyJWT);

// router.get('/post/:postId', getComments);
// router.get('/comment/:parentCommentId', getComments);
// router.post('/post/:postId', addComment);
// router.post('/comment/:parentCommentId', addComment);
// router.patch('/:commentId', updateComment);
// router.delete('/:commentId', deleteComment);

// export default router;

import { Router } from 'express';
import {
    getComments,
    addComment,
    updateComment,
    deleteComment
} from '../controllers/comment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyJWT as verifyOrgJWT } from '../middlewares/org.middleware.js';

const router = Router();

// /api/v1/comments
router.use((req, res, next) => {
    // Try user JWT first, then org JWT
    verifyJWT(req, res, (err) => {
        if (err) {
            verifyOrgJWT(req, res, next);
        } else {
            next();
        }
    });
});

// User routes
router.get('/post/:postId', getComments);
router.get('/comment/:parentCommentId', getComments);
router.post('/post/:postId', addComment);
router.post('/comment/:parentCommentId', addComment);
router.patch('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

// Organization routes
// router.get('/org/post/:postId', getComments);
// router.get('/org/comment/:parentCommentId', getComments);
// router.post('/org/post/:postId', addComment);
// router.post('/org/comment/:parentCommentId', addComment);
// router.patch('/org/:commentId', updateComment);
// router.delete('/org/:commentId', deleteComment);

export default router;