import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Request {
  _id: string;
  bloodGroup: string;
  urgency: string;
  message: string;
  contactDetails: {
    email: string;
    phone: string;
  };
  status: string;
  address: {
    state: string;
    district: string;
    city: string;
  };
}

function UserRequests() {
  const userID = useSelector((state: RootState) => state.auth.user?.id);
  const [requests, setRequests] = useState<Request[]>([]);

  const fetchRequests = async () => {
    try {
      const response = await api.get(`/blood-requests/user/${userID}&page=1`);
      if (response.status === 200) {
        setRequests(response.data.data.bloodRequests);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    console.log(`Edit request with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/blood-requests/delete/${id}`);
      if (response.status === 200) {
        setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
      }
    } catch (error: any) {
      console.error(`Failed to delete request with ID: ${id}`, error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-6">Your Requests</h1>
      <div className="flex flex-col items-center">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className={`border border-gray-300 rounded-lg p-6 my-4 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg ${request.urgency === "high" ? "border-red-500" : request.urgency === "medium" ? "border-orange-500" : "border-yellow-500"}`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-primary">Blood Group:</h2>
                  <p className="text-lg">{request.bloodGroup}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Urgency:</h2>
                  <p className="text-lg">{request.urgency}</p>
                </div>
                <div className="col-span-2">
                  <h2 className="text-xl font-bold text-primary">Message:</h2>
                  <p className="text-lg">{request.message}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Email:</h2>
                  <p className="text-lg">{request.contactDetails.email}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Phone:</h2>
                  <p className="text-lg">{request.contactDetails.phone}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Status:</h2>
                  <p className="text-lg">{request.status}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Address:</h2>
                  <p className="text-lg">
                    {request.address.city}, {request.address.district}, {request.address.state}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleEdit(request._id)}
                  className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(request._id)}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No blood requests found.</p>
        )}
      </div>
    </div>
  );
}

export default UserRequests;
