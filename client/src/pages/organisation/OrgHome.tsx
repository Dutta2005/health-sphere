import { useSelector } from "react-redux"
import OrgCreatePost from "../../components/organisation/post/CreatePost"
import { RootState } from "../../store/store"
import OrganizationLandingPage from "../../components/organisation/OrganizationLandingPage"

function OrgHome() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    return (
        <div>
            {isAuthenticated ? (
        <div>
            <OrgCreatePost />
        </div>
        ) : (
            <OrganizationLandingPage />
        )}
        </div>
    )
}

export default OrgHome
