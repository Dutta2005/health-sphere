import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { Organization } from "../models/organization.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (orgId) => {
    try {
        const organization = await Organization.findById(orgId);
        const accessToken = organization.generateAccessToken();
        const refreshToken = organization.generateRefreshToken();

        organization.refreshToken = refreshToken;
        await organization.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// Initial Registration Step
const initiateRegistration = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        throw new ApiError(400, "Name, email, and password are required");
    }

    // Check existing organization
    const existedOrg = await Organization.findOne({ email });

    if (existedOrg) {
        throw new ApiError(409, "Organization already exists with this email");
    }

    // Create initial organization registration
    const organization = await Organization.create({
        name,
        email,
        password,
        registrationComplete: false
    });

    return res.status(200).json(
        new ApiResponse(200, "Initial registration successful", {
            orgId: organization._id
        })
    );
});

// Complete Registration Step
const completeRegistration = asyncHandler(async (req, res) => {
    const { 
        orgId, 
        description, 
        type, 
        website 
    } = req.body;

    if (!orgId) {
        throw new ApiError(400, "Organization ID is required");
    }

    if (!description) {
        throw new ApiError(400, "Description is required");
    }

    if (!type) {
        throw new ApiError(400, "Organization type is required");
    }

    const organization = await Organization.findByIdAndUpdate(
        orgId,
        {
            $set: {
                description,
                type,
                website: website || null,
                registrationComplete: true
            }
        },
        { new: true, runValidators: true }
    );

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    // Generate tokens after complete registration
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(organization._id);

    const loggedInOrganization = await Organization.findById(organization._id).select("-password -refreshToken");

    const accessOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIARY) * 1000
    };

    const refreshOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIARY) * 1000  
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessOptions)
        .cookie("refreshToken", refreshToken, refreshOptions)
        .json(
            new ApiResponse(200, "Organization registration completed successfully", {
                organization: loggedInOrganization,
                accessToken,
                refreshToken
            })
        );
});

// Login Organization
const loginOrganization = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const organization = await Organization.findOne({ email });

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    const isPasswordValid = await organization.isPasswordMatched(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(organization._id);

    const loggedInOrganization = await Organization.findById(organization._id).select("-password -refreshToken");

    const accessOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIARY) * 1000
    };

    const refreshOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIARY) * 1000
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessOptions)
        .cookie("refreshToken", refreshToken, refreshOptions)
        .json(
            new ApiResponse(200, "Organization logged in successfully", {
                organization: loggedInOrganization,
                accessToken,
                refreshToken
            })
        );
});

// Logout Organization
const logoutOrganization = asyncHandler(async (req, res) => {
    await Organization.findByIdAndUpdate(
        req.organization._id,
        {
            $set: { refreshToken: undefined }
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "Organization logged out successfully", {}));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
        const organization = await Organization.findById(decodedToken?._id);
    
        if (!organization) {
            throw new ApiError(401, "Invalid refresh token");
        }    
    
        if (incomingRefreshToken !== organization?.refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }
    
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(organization._id);
    
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)        
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    "Access token refreshed successfully", 
                    {accessToken, refreshToken: newRefreshToken}
                ));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

// change password
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Current password and new password are required");
    }

    const organization = await Organization.findById(req.organization._id);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    const isPasswordValid = await organization.isPasswordMatched(currentPassword);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid current password");
    }

    organization.password = newPassword;
    await organization.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, "Password changed successfully", {}));
})

// Update organization profile
const updateOrganization = asyncHandler(async (req, res) => {
    const { name, description, type, website } = req.body;

    const organization = await Organization.findByIdAndUpdate(
        req.organization._id,
        {
            $set: { name, description, type, website }
        },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, "Organization profile updated successfully", organization));
})

// Get organization profile
const getOrganizationProfile = asyncHandler(async (req, res) => {
    const organization = await Organization.findById(req.organization._id).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, "Organization profile fetched successfully", organization));
})

export {
    initiateRegistration,
    completeRegistration,
    loginOrganization,
    logoutOrganization,
    refreshAccessToken,
    changePassword,
    updateOrganization,
    getOrganizationProfile
};