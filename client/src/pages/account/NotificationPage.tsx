import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bell, CheckCheck, Droplet, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { api } from "../../api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

interface Notification {
  userId: string;
  type: string;
  message: string;
  redirectUrl: string;
  isRead: boolean;
  createdAt?: string;
  _id: string;
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

const NotificationItem = ({ 
  notification, 
  onDelete 
}: { 
  notification: Notification;
  onDelete: (id: string) => void;
}) => {
  const bgColor = notification.isRead 
    ? "bg-background hover:bg-accent/5" 
    : "bg-accent/10 hover:bg-accent/15";

  const handleMarkRead = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!notification.isRead) {
      try {
        await api.patch(`/notifications/mark-read/${notification._id}`);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  return (
    <div className="group relative">
      <Link to={notification.redirectUrl} onClick={handleMarkRead}>
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(notification._id)}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
      </Button>
    </div>
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

  const deleteNotification = async (id: string) => {
    try {
      const response = await api.delete(`/notifications/delete/${id}`);
      if (response.status === 200) {
        setNotifications(prev => prev.filter(n => n._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const response = await api.delete('/notifications/delete-all');
      if (response.status === 200) {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Failed to delete all notifications:', error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          {notifications.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {notifications.length} total, {unreadCount} unread
            </p>
          )}
        </div>
        <div className="flex gap-2">
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
          {notifications.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-sm text-primary hover:text-primary"
                >
                  Clear all
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All notifications will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAllNotifications}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
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
          notifications.map((notification) => (
            <NotificationItem 
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPage;