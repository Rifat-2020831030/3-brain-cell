import { useParams } from "react-router-dom";
import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import OrgDashboard from "../organization/pages/OrgDashboard";
import DashboardNavbar from "../shared/components/DashboardNavbar";
import TeamCreation from "../organization/pages/TeamCreation";

export const OrganizationRoute = () => {
  const { activeSection } = useParams();
  return (
    <ProtectedRoute roles={["organization"]}>
      <DashboardNavbar heading="Organization Dashboard">
        <OrgDashboard activeSection={activeSection || "home"} />
      </DashboardNavbar>
    </ProtectedRoute>
  );
};

export const TeamCreationRoute = () => {
  return (
    <ProtectedRoute roles={["organization"]}>
      <DashboardNavbar heading="Create a Team">
        <TeamCreation />
      </DashboardNavbar>
    </ProtectedRoute>
  );
};
