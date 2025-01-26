import { Outlet } from "react-router"

function Layout() {

    return (
        <div>
            <h1 className="text-4xl text-center">Organisation Layout</h1>
            <Outlet />
        </div>
    )
}

export default Layout
