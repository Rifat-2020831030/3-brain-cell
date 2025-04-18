import { useParams } from "react-router-dom";
import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import DashboardNavbar from "../shared/components/DashboardNavbar";
import OrgDashboard from "../organization/pages/OrgDashboard";

const OrganizationRoute = () => {
    const { activeSection } = useParams();
    return (
        <ProtectedRoute roles={["organization"]}>
            <DashboardNavbar heading="Organization Dashboard">
                <OrgDashboard activeSection={activeSection || "home"} />
            </DashboardNavbar>
        </ProtectedRoute>
    );
}

export default OrganizationRoute;