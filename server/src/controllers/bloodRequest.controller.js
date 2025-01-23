import { BloodRequest } from "../models/bloodRequest.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

// craete a new blood request
const createBloodRequest = asyncHandler(async (req, res) => {
    try {
        const { bloodGroup, urgency, message, status, contactDetails, address } = req.body;
    
        if (!bloodGroup || !urgency || !status || !contactDetails || !address) {
            throw new ApiError(400, "All fields are required");
        }
    
        if (!req.user) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const bloodRequest = await BloodRequest.create({
            userId: req.user._id,
            bloodGroup,
            urgency,
            message: message || "Urgent blood required",
            contactDetails,
            status,
            address
        });
    
        const savedBloodRequest = await bloodRequest.save();
    
        return res.status(201).json(
            new ApiResponse(201, "Blood request created successfully", {
                bloodRequest: savedBloodRequest
            })
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while creating blood request")
        )
    }
})

// get all blood requests
const getAllBloodRequests = asyncHandler(async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find().sort({ createdAt: -1 });
        return res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
        )
    }
})

// get blood request by id
const getBloodRequestById = asyncHandler(async (req, res) => {
    try {
        const bloodRequestId = req.params.id;
        const bloodRequest = await BloodRequest.findById(bloodRequestId);
        if (!bloodRequest) {
            throw new ApiError(404, "Blood request not found");
        }
        return res.status(200).json(
            new ApiResponse(200, "Blood request fetched successfully", bloodRequest)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while fetching blood request")
        )
    }
})

// get blood requests by user id
const getBloodRequestsByUserId = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const bloodRequests = await BloodRequest.find({ userId });
        return res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
        )
    }    
})

// get blood requests by blood group
const getBloodRequestsByBloodGroup = asyncHandler(async (req, res) => {
    try {
        const { bloodGroup } = req.query;

        // Validate bloodGroup parameter
        if (!bloodGroup) {
            return res.status(400).json(
                new ApiResponse(400, "Blood group is required")
            );
        }

        const bloodRequests = await BloodRequest.find({ bloodGroup: bloodGroup });
        return res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
        );
    }
});

// update blood request status
const updateBloodRequestStatus = asyncHandler(async (req, res) => {
    try {
        const bloodRequestId = req.params.id;
        const { status } = req.body;
        const bloodRequest = await BloodRequest.findById(bloodRequestId);
        if (!bloodRequest) {
            throw new ApiError(404, "Blood request not found");
        }
        bloodRequest.status = status;
        const updatedBloodRequest = await bloodRequest.save();
        return res.status(200).json(
            new ApiResponse(200, "Blood request status updated successfully", updatedBloodRequest)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while updating blood request status")
        )
    }
})

// update blood request
const updateBloodRequest = asyncHandler(async (req, res) => {
    try {
        const bloodRequestId = req.params.id;
        const { bloodGroup, urgency, message, contactDetails, address } = req.body;
        const bloodRequest = await BloodRequest.findById(bloodRequestId);
        if (!bloodRequest) {
            throw new ApiError(404, "Blood request not found");
        }
        bloodRequest.bloodGroup = bloodGroup || bloodRequest.bloodGroup;
        bloodRequest.urgency = urgency || bloodRequest.urgency;
        bloodRequest.message = message || bloodRequest.message;
        bloodRequest.contactDetails = contactDetails || bloodRequest.contactDetails;
        bloodRequest.address = address || bloodRequest.address;
        const updatedBloodRequest = await bloodRequest.save();
        return res.status(200).json(
            new ApiResponse(200, "Blood request updated successfully", updatedBloodRequest)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while updating blood request")
        )    
    }
})

// delete blood request
const deleteBloodRequest = asyncHandler(async (req, res) => {
    try {
        const bloodRequestId = req.params.id;
        await BloodRequest.findByIdAndDelete(bloodRequestId);
        return res.status(200).json(
            new ApiResponse(200, "Blood request deleted successfully", null)
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while deleting blood request")
        )
    }
})

// Fetch Blood Requests with Status Filtering
const getBloodRequestsByStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.query;
    
        if (status && !['pending', 'accepted', 'rejected'].includes(status)) {
            throw new ApiError(400, "Invalid status");
        }
    
        const bloodRequests = await BloodRequest.find(status ? { status } : {})
          .populate('userId', 'name email');
    
        res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
        );
    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
        );
    }
})

export {
    createBloodRequest, 
    getAllBloodRequests, 
    getBloodRequestById, 
    getBloodRequestsByUserId,
    getBloodRequestsByBloodGroup, 
    updateBloodRequestStatus, 
    updateBloodRequest, 
    deleteBloodRequest,
    getBloodRequestsByStatus
}

