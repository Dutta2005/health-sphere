import { useParams } from "react-router";
import { Badge } from "../components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

interface Address {
    state: string;
    district: string;
    city: string;
}

interface ContactDetails {
    email: string;
    phone: string;
}

interface Volunteer {
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    canShareDetails: boolean;
}

interface Request {
    _id: string;
    bloodGroup: string;
    urgency: string;
    message: string;
    contactDetails: ContactDetails;
    status: string;
    userId: string;
    address: Address;
    createdAt: string;
    volunteers: Volunteer[];
}

export default function BloodBridgeRequest() {
    const { id } = useParams();
    const [request, setRequest] = useState<Request | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userId = useSelector((state: RootState) => state.auth.user?.id);

    useEffect(() => {
        const getRequest = async () => {
            try {
                const response = await api.get(`blood-requests/${id}`);
                setRequest(response.data.data);
            } catch (error: any) {
                setError("Failed to load request details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        getRequest();
    }, [id]);

    const getUrgencyColor = (urgency: string) => {
        switch (urgency.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
            case "medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
            case "low":
                return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
        }
    };

    return (
        <div className="p-4">
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <Card className="p-4">
                    <Skeleton className="h-6 w-1/3 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                </Card>
            ) : request ? (
                <Card className="hover:shadow-lg transition-shadow dark:bg-dark-bg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-semibold flex gap-3 items-center">
                            <Badge className="border-primary text-primary dark:border-dark-text dark:text-dark-text bg-light-bg dark:bg-dark-bg">
                                {request.bloodGroup}
                            </Badge>
                            <Badge className="border-primary text-primary dark:border-dark-text dark:text-dark-text bg-light-bg dark:bg-dark-bg">
                                {request.volunteers.length} volunteer{request.volunteers.length !== 1 ? "s" : ""}
                            </Badge>
                            <Badge className={getUrgencyColor(request.urgency)}>
                                {request.urgency.toUpperCase()}
                            </Badge>
                        </CardTitle>
                        <Badge>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-1">Message</h3>
                                <p className="text-gray-600 dark:text-dark-text">{request.message}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Location</h3>
                                <p className="text-gray-600 dark:text-dark-text">
                                    {request.address.city}, {request.address.district}, {request.address.state}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Contact</h3>
                                <p className="text-gray-600 dark:text-dark-text">{request.contactDetails.phone}</p>
                                <p className="text-gray-600 dark:text-dark-text">{request.contactDetails.email}</p>
                            </div>
                        </div>
                    </CardContent>
                    {userId === request.userId && (
                        <CardFooter className="block text-center">
                            <h3 className="font-semibold mb-2 text-xl">Volunteers</h3>
                            <div className="w-full grid grid-cols-2 text-light-text dark:text-dark-text bg-secondary/20 py-3 mb-5">
                                <p className="font-semibold">Name</p>
                                <p className="font-semibold">Contact</p>
                            </div>
                            {request.volunteers.length === 0 && <p className="text-gray-600 dark:text-dark-text">No volunteers yet.</p>}
                            {request.volunteers.map((volunteer) => (
                                <div key={volunteer.user._id} className="w-full grid grid-cols-2 text-light-text dark:text-dark-text border-b py-2">
                                    <p className="flex items-center justify-center">{volunteer.user.name}</p>
                                    {volunteer.canShareDetails ? (
                                        <div>
                                            <p>{volunteer.user.phone || "-"}</p>
                                            <p>{volunteer.user.email || "-"}</p>
                                        </div>
                                    ) : (
                                        <p className="italic text-gray-500">Contact details hidden</p>
                                    )}
                                </div>
                            ))}
                        </CardFooter>
                    )}
                </Card>
            ) : (
                <p className="text-gray-600 dark:text-dark-text">No request found.</p>
            )}
        </div>
    );
}
