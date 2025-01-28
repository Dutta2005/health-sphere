import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bell, CheckCheck, Droplet } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { api } from "../../api/api";

interface Notification {
    userId: string;
    type: string;
    message: string;
    redirectUrl: string;
    isRead: boolean;
    createdAt?: string;
}

const NotificationSkeleton = () => (
  <Card className="flex items-center gap-4 p-4 animate-pulse">
    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
    </div>
  </Card>
);

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const bgColor = notification.isRead 
    ? "bg-background hover:bg-accent/5" 
    : "bg-accent/10 hover:bg-accent/15";

  return (
    <Link to={notification.redirectUrl}>
      <Card className={`flex items-center gap-4 p-4 transition-colors ${bgColor}`}>
        <CardHeader className="w-8 h-8 bg-accent/20 dark:bg-accent/30 rounded-full flex items-center justify-center p-0">
          {notification.type === "blood_request" ? (
            <Droplet className="text-primary" size={16} />
          ) : (
            <Bell className="text-primary" size={16} />
          )}
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <p className="text-sm text-foreground">{notification.message}</p>
          {notification.createdAt && (
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(notification.createdAt).toLocaleDateString()}
            </p>
          )}
        </CardContent>
        {notification.isRead && (
          <CheckCheck className="text-muted-foreground" size={16} />
        )}
      </Card>
    </Link>
  );
};

function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/notifications/');
      if (response.status === 200) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      const response = await api.patch('/notifications/mark-all-read');
      if (response.status === 200) {
        await getNotifications();
      }
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllRead}
            className="text-sm"
          >
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))
        ) : notifications.length === 0 ? (
          <Card className="p-8">
            <div className="text-center space-y-2">
              <Bell className="mx-auto text-muted-foreground" size={24} />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          </Card>
        ) : (
          notifications.map((notification, index) => (
            <NotificationItem 
              key={index} 
              notification={notification} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPage;