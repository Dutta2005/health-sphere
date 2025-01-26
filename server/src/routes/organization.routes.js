import { Router } from "express";
import {
    initiateRegistration,
    completeRegistration,
    loginOrganization,
    logoutOrganization,
    refreshAccessToken,
    changePassword,
    updateOrganization,
    getOrganizationProfile
} from "../controllers/organization.controller.js";
import { verifyJWT } from "../middlewares/org.middleware.js";

const router = Router();

// /api/v1/organizations

router.post("/refresh-token", refreshAccessToken);
router.post("/initial-register", initiateRegistration);
router.post("/login", loginOrganization);
router.post("/complete-register", verifyJWT, completeRegistration);

router.use(verifyJWT)
router.post("/logout", logoutOrganization);
router.post("/change-password", changePassword);
router.patch("/update", updateOrganization);
router.get("/profile", getOrganizationProfile);


export default router;