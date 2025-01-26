import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateUser,
    searchDonors,
    updateDonationStatus,
    getCurrentUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// secure routes
router.use(verifyJWT);
router.post("/logout", logoutUser);
router.post("/change-password", changeCurrentPassword);
router.patch("/update", updateUser);
router.get("/search", searchDonors);
router.patch("/donation-status", updateDonationStatus);
router.get("/current-user", getCurrentUser);

export default router;