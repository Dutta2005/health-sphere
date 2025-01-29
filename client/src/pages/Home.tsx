import { useSelector } from "react-redux"
import LandingPage from "./LandingPage"

function Home() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    return (
        <div>
            
            {isAuthenticated ? (
                <p>Welcome to the home page!</p>
            ) : (
                <LandingPage />
            )}
        </div>
    )
}

export default Home
