import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { api } from "../../api/api";
import { RootState } from "../../store/store";

interface Address {
  state: string;
  district: string;
  city: string;
}

interface ContactDetails {
  email: string;
  phone: string;
}

interface Request {
  _id: string;
  bloodGroup: string;
  urgency: string;
  message: string;
  contactDetails: ContactDetails;
  status: string;
  address: Address;
}

interface RequestCardProps {
  request: Request;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UrgencyBadge = ({ urgency }: { urgency: string }) => {
  const colors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-orange-100 text-orange-800",
    low: "bg-yellow-100 text-yellow-800"
  };

  return (
    <Badge className={colors[urgency as keyof typeof colors]}>
      {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
    </Badge>
  );
};

const RequestCard: React.FC<RequestCardProps> = ({ request, onEdit, onDelete }) => {
  const { bloodGroup, urgency, message, contactDetails, status, address } = request;

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Blood Group: {bloodGroup}</CardTitle>
          <UrgencyBadge urgency={urgency} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Message</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Status</h3>
            <Badge variant="outline">{status}</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Contact Details</h3>
            <p className="text-gray-600">{contactDetails.email}</p>
            <p className="text-gray-600">{contactDetails.phone}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600">
              {address.city}, {address.district}, {address.state}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onEdit(request._id)}
            className="flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(request._id)}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const UserRequests = () => {
  const userID = useSelector((state: RootState) => state.auth.user?.id);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/blood-requests/user/${userID}&page=1`);
      if (response.status === 200) {
        setRequests(response.data.data.bloodRequests);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blood requests');
    } finally {
      setIsLoading(false);
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
        setRequests((prevRequests) => 
          prevRequests.filter((request) => request._id !== id)
        );
      }
    } catch (error: any) {
      setError(`Failed to delete request: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userID]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Blood Donation Requests</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Card>
            <CardContent className="flex justify-center py-8">
              <p className="text-gray-500">No blood donation requests found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserRequests;