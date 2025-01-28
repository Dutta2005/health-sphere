import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Bell, Droplet } from "lucide-react"
import { Link } from "react-router"

function Notifications() {
    const notifications = useSelector((state: RootState) => state.notification.notifications)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative dark:text-dark-text">
                    <Bell size={20} />
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-sm text-white rounded-full flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="p-4">
                    {notifications.length === 0 ? (
                        <p className="text-center">No new notifications</p>
                    ) : (
                        notifications.map((notification, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                                    {notification.type === "bloodRequest" ? (
                                        <Droplet className="text-primary" size={16} />
                                    ) : (
                                        <Bell size={16} />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm">{notification.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <Link to="/notifications" className="block p-4 text-center text-primary">
                    View all notifications
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Notifications
