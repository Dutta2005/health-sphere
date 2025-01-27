import { useSelector } from "react-redux"
import { Link } from "react-router"

function Home() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    return (
        <div>
            <h1 className="mb-6">Home</h1>
            <Link to="/organisation" className="bg-accent text-white rounded-lg px-4 py-2 ">Organisation Login</Link>
            {isAuthenticated ? (
                <p>Welcome to the home page!</p>
            ) : (
                <p>You are not authenticated. Please login to access this page.</p>
            )}
        </div>
    )
}

export default Home
