import { BloodRequest } from "../models/bloodRequest.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js"; // Assuming you have a User model
import { Notification } from "../models/notification.model.js"; // Notification model
import { getIO } from "../utils/webSocket.js"; // Import WebSocket instance



// craete a new blood request
// const createBloodRequest = asyncHandler(async (req, res) => {
//     try {
//         const { bloodGroup, urgency, message, status, contactDetails, address } = req.body;
    
//         if (!bloodGroup || !urgency || !status || !contactDetails || !address) {
//             throw new ApiError(400, "All fields are required");
//         }
    
//         if (!req.user) {
//             throw new ApiError(401, "Unauthorized request");
//         }
    
//         const bloodRequest = await BloodRequest.create({
//             userId: req.user._id,
//             bloodGroup,
//             urgency,
//             message: message || "Urgent blood required",
//             contactDetails,
//             status,
//             address
//         });
    
//         const savedBloodRequest = await bloodRequest.save();
    
//         return res.status(201).json(
//             new ApiResponse(201, "Blood request created successfully", {
//                 bloodRequest: savedBloodRequest
//             })
//         );
//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(500, error?.message || "Something went wrong while creating blood request")
//         )
//     }
// })

const createBloodRequest = asyncHandler(async (req, res) => {
    try {
        const { bloodGroup, urgency, message, status, contactDetails, address } = req.body;
    
        if (!bloodGroup || !urgency || !status || !contactDetails || !address) {
            throw new ApiError(400, "All fields are required");
        }
    
        if (!req.user) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        // Create and save the blood request
        const bloodRequest = await BloodRequest.create({
            userId: req.user._id,
            bloodGroup,
            urgency,
            message: message || "Urgent blood required",
            contactDetails,
            status,
            address,
        });
    
        const savedBloodRequest = await bloodRequest.save();

        // Notify users based on location and blood group
        const io = getIO();

        // Extract location details (city, district, state)
        const { city, district, state } = address;

        // Step 1: Find users in the same city with the same blood group
        let users = await User.find({ "info.bloodGroup": bloodGroup, "address.city": city });


        // Step 2: If no users are found in the city, search in the district
        if (users.length === 0) {
            users = await User.find({ "info.bloodGroup": bloodGroup, "address.district": district });
        }
        

        // Step 3: If no users are found in the district, search in the state
        if (users.length === 0) {
            users = await User.find({ "info.bloodGroup": bloodGroup, "address.state": state });
        }

        // Step 4: Create notifications for all matching users
        const notifications = users.map((user) => ({
                userId: user._id,
                type: "blood_request",
                message: `A blood request for ${bloodGroup} is needed in ${city}.`,
                redirectUrl: `/blood-requests/${savedBloodRequest._id}`, // Redirect URL
                data: { bloodRequestId: savedBloodRequest._id },
            }))

        // Step 5: Save notifications to the database
        console.log(notifications);
        
        try {
            await Notification.insertMany(notifications);
            console.log("Notifications inserted successfully");
        } catch (error) {
            console.error("Error inserting notifications:", error.message);
        }
        

        // Step 4: Generate notifications and emit them via WebSocket
        users.forEach(async (user) => {
            notifications.forEach((notification) => {
                io.to(user._id.toString()).emit("bloodRequest", {
                    type: notification.type,
                    message: notification.message || "An urgent blood request is needed in your area",
                    redirectUrl: notification.redirectUrl || `/blood-requests/${savedBloodRequest._id}`,
                    data: notification.data || { bloodRequestId: savedBloodRequest._id },
                });
            });
        });
        

        return res.status(201).json(
            new ApiResponse(201, "Blood request created successfully", {
                bloodRequest: savedBloodRequest,
            })
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while creating blood request")
        );
    }
});


// get all blood requests
// const getAllBloodRequests = asyncHandler(async (req, res) => {
//     try {
//         const bloodRequests = await BloodRequest.find().sort({ createdAt: -1 });
//         return res.status(200).json(
//             new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
//         );
//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
//         )
//     }
// })
const getAllBloodRequests = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalRequests = await BloodRequest.countDocuments();
        const bloodRequests = await BloodRequest.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", {
                bloodRequests,
                currentPage: page,
                totalPages: Math.ceil(totalRequests / limit),
                totalRequests,
                hasNext: page * limit < totalRequests,
                hasPrev: page > 1
            })
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
// const getBloodRequestsByUserId = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const bloodRequests = await BloodRequest.find({ userId });
//         return res.status(200).json(
//             new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
//         );
//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
//         )
//     }    
// })
const getBloodRequestsByUserId = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const userId = req.user._id;

        const totalRequests = await BloodRequest.countDocuments({ userId });
        const bloodRequests = await BloodRequest.find({ userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", {
                bloodRequests,
                currentPage: page,
                totalPages: Math.ceil(totalRequests / limit),
                totalRequests,
                hasNext: page * limit < totalRequests,
                hasPrev: page > 1
            })
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
        )
    }    
})

// get blood requests by blood group
// const getBloodRequestsByBloodGroup = asyncHandler(async (req, res) => {
//     try {
//         const { bloodGroup } = req.query;

//         // Validate bloodGroup parameter
//         if (!bloodGroup) {
//             return res.status(400).json(
//                 new ApiResponse(400, "Blood group is required")
//             );
//         }

//         const bloodRequests = await BloodRequest.find({ bloodGroup: bloodGroup });
//         return res.status(200).json(
//             new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
//         );
//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
//         );
//     }
// });
const getBloodRequestsByBloodGroup = asyncHandler(async (req, res) => {
    try {
        let { bloodGroup } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Decode the blood group from the URL
        bloodGroup = decodeURIComponent(bloodGroup);

        // Handle the case where '+' might be encoded as space
        if (bloodGroup.includes(' ')) {
            bloodGroup = bloodGroup.replace(' ', '+');
        }

        // Log the received and processed blood group
        // console.log('Received blood group:', req.query.bloodGroup);
        // console.log('Processed blood group:', bloodGroup);

        // Validate bloodGroup parameter
        if (!bloodGroup) {
            return res.status(400).json(
                new ApiResponse(400, "Blood group is required")
            );
        }

        // Validate blood group against allowed values
        const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        if (!validBloodGroups.includes(bloodGroup)) {
            return res.status(400).json(
                new ApiResponse(400, `Invalid blood group. Must be one of: ${validBloodGroups.join(', ')}. Received: ${bloodGroup}`)
            );
        }

        const totalRequests = await BloodRequest.countDocuments({ bloodGroup });
        const bloodRequests = await BloodRequest.find({ bloodGroup })
            .skip(skip)
            .limit(limit);

        return res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", {
                bloodRequests,
                currentPage: page,
                totalPages: Math.ceil(totalRequests / limit),
                totalRequests,
                hasNext: page * limit < totalRequests,
                hasPrev: page > 1
            })
        );
    } catch (error) {
        console.error('Error in getBloodRequestsByBloodGroup:', error);
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
// const getBloodRequestsByStatus = asyncHandler(async (req, res) => {
//     try {
//         const { status } = req.query;
    
//         if (status && !['pending', 'accepted', 'rejected'].includes(status)) {
//             throw new ApiError(400, "Invalid status");
//         }
    
//         const bloodRequests = await BloodRequest.find(status ? { status } : {})
//           .populate('userId', 'name email');
    
//         res.status(200).json(
//             new ApiResponse(200, "Blood requests fetched successfully", bloodRequests)
//         );
//     } catch (error) {
//         res.status(500).json(
//             new ApiResponse(500, error?.message || "Something went wrong while fetching blood requests")
//         );
//     }
// })
const getBloodRequestsByStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        if (status && !['pending', 'accepted', 'rejected'].includes(status)) {
            throw new ApiError(400, "Invalid status");
        }
    
        const query = status ? { status } : {};
        const totalRequests = await BloodRequest.countDocuments(query);
        const bloodRequests = await BloodRequest.find(query)
            .populate('userId', 'name email')
            .skip(skip)
            .limit(limit);
    
        res.status(200).json(
            new ApiResponse(200, "Blood requests fetched successfully", {
                bloodRequests,
                currentPage: page,
                totalPages: Math.ceil(totalRequests / limit),
                totalRequests,
                hasNext: page * limit < totalRequests,
                hasPrev: page > 1
            })
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

