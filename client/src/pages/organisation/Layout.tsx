import { Link, Outlet } from "react-router"
import OrgLogoutBtn from "../../components/organisation/OrgLogoutBtn"

function Layout() {

    return (
        <div>
            <h1 className="text-4xl text-center">Organisation Layout</h1>
            <OrgLogoutBtn />
            <Link to={"/organisation/register"}>Register</Link>
            <Outlet />
        </div>
    )
}

export default Layout
