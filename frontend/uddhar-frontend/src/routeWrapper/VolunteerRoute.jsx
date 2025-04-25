import { useParams } from "react-router-dom";
import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import DashboardNavbar from "../shared/components/DashboardNavbar";
import Volunteer from "../volunteer/pages/Volunteer";
import ComingSoon from "../shared/pages/ComingSoon";
import { useAuth } from "../authentication/context/AuthContext";

const VolunteerRoute = () => {
  const { logout } = useAuth();
  const { activeSection } = useParams();
  return (
    <ProtectedRoute roles={["volunteer"]}>
      {(activeSection == null || activeSection === "home") && (
        <DashboardNavbar heading="Volunteer Dashboard">
          <Volunteer activeSection={activeSection || "home"} />
        </DashboardNavbar>
      )}

      {(activeSection == "team-info" ||
        activeSection == "past-disaster" ||
        activeSection == "analytics" ||
        activeSection == "disaster-reporting" ||
        activeSection == "inbox") && (
        <DashboardNavbar heading="Volunteer Dashboard">
          <ComingSoon link={"/dashboard/volunteer/"} />
        </DashboardNavbar>
      )}
      {activeSection === "logout" && (
        logout()
      )}
    </ProtectedRoute>
  );
};

export default VolunteerRoute;
