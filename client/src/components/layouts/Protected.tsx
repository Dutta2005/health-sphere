import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate } from "react-router"
import { useToast } from "../../hooks/use-toast"

function Protected({ children, role = "any" }: any) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated)
    if (role === "any" && isLoggedIn) return children
    const roleStore = useSelector((state: RootState) => state.auth.role)
    if (isLoggedIn && roleStore === role) return children
    else {
        const { toast } = useToast()
        toast({
            title: "Unauthorized",
            description: "You need to sign in to access this page",
            variant: "destructive",
            duration: 3000
        })
        if( role === "organization") return <Navigate to={"/signin"} replace />
        return <Navigate to={"/login"} replace />
    }
}

export default Protected
 