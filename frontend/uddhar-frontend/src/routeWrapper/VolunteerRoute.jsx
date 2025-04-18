import { useParams } from "react-router-dom";
import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import DashboardNavbar from "../shared/components/DashboardNavbar";
import Volunteer from '../volunteer/pages/Volunteer';

const VolunteerRoute = () => {
    const { activeSection } = useParams();
    return (
        <ProtectedRoute roles={["volunteer"]}>
            <DashboardNavbar heading="Volunteer Dashboard">
                <Volunteer activeSection={activeSection || "home"} />
            </DashboardNavbar>
        </ProtectedRoute>
    );
}

export default VolunteerRoute;