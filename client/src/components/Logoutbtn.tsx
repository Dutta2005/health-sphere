import { LogOut } from "lucide-react"
import { api } from "../api/api"
import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import { useNavigate } from "react-router"


function Logoutbtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signOut = async() => {
        try {
            const response = await api.post('/users/logout')
            if(response.status === 200){
                dispatch(logout())
                navigate('/', {replace: true})
            }
        } catch (error: any) {
            console.error(error.response.data)
            
        }
    }
    return (
        <button className="w-full flex items-center justify-center gap-2 text-red-600" onClick={signOut}>
            <span>Logout</span>
            <LogOut className="w-5 h-5" />
        </button>
    )
}

export default Logoutbtn
