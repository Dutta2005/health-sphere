import { useSelector } from "react-redux"

function Home() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    return (
        <div>
            <h1>Home</h1>
            {isAuthenticated ? (
                <p>Welcome to the home page!</p>
            ) : (
                <p>You are not authenticated. Please login to access this page.</p>
            )}
        </div>
    )
}

export default Home
