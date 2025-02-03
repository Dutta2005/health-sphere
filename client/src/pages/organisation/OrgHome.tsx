import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import OrganizationLandingPage from "../../components/organisation/OrganizationLandingPage"
import Header from "../../components/organisation/dashboard/Header"
import PastActivities from "../../components/organisation/dashboard/PastActivities"

function OrgHome() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    return (
        <div>
            {isAuthenticated ? (
            <div className="my-7">
                <Header />
                <PastActivities />
            </div>
            ) : (
                <OrganizationLandingPage />
            )}
        </div>
    )
}

export default OrgHome
