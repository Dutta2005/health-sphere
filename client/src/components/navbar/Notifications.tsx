import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
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
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-sm text-white rounded-full flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0">
                <div className="flex flex-col h-[480px]">
                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            {notifications.length === 0 ? (
                                <p className="text-center text-muted-foreground">
                                    No new notifications
                                </p>
                            ) : (
                                notifications.map((notification, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-start gap-4 mb-4 last:mb-0"
                                    >
                                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                                            {notification.type === "bloodRequest" ? (
                                                <Droplet className="text-primary" size={16} />
                                            ) : (
                                                <Bell className="text-primary" size={16} />
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm leading-none">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                2 mins ago
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                    <Separator />
                    <Link 
                        to="/notifications" 
                        className="block p-4 text-center text-sm text-primary hover:bg-accent/10 transition-colors"
                    >
                        View all notifications
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Notifications