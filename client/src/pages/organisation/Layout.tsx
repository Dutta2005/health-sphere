import { Link, Outlet } from "react-router"
import OrgLogoutBtn from "../../components/organisation/OrgLogoutBtn"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function Layout() {
    let isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated)
    const role = useSelector((state: RootState) => state.auth.role)
    isLoggedIn = isLoggedIn && role === "organization"
    return (
        <div>
            <h1 className="text-4xl text-center">Organisation Layout</h1>
            { isLoggedIn && <OrgLogoutBtn /> }
            { !isLoggedIn && <Link to="/signin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link> }
            <Outlet />
        </div>
    )
}

export default Layout
