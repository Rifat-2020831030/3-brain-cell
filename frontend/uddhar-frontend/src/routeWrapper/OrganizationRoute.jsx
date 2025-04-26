import { useParams } from "react-router-dom";
import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import { useAuth } from "../authentication/context/AuthContext";
import OrgDashboard from "../organization/pages/OrgDashboard";
import Reporting from "../organization/pages/Reporting";
import TeamCreation from "../organization/pages/TeamCreation";
import DashboardNavbar from "../shared/components/DashboardNavbar";
import ComingSoon from "../shared/pages/ComingSoon";
import Profile from "../shared/pages/Profile";
import MemberList from "../organization/pages/MemberList";

export const OrganizationRoute = () => {
  const { logout } = useAuth();
  const { activeSection } = useParams();
  return (
    <ProtectedRoute roles={["organization"]}>
      {(activeSection == null || activeSection == "home") && (
        <DashboardNavbar heading="Organization Dashboard">
          <OrgDashboard />
        </DashboardNavbar>
      )}
      {activeSection == "create-a-team" && (
        <DashboardNavbar heading="Create a Team">
          <TeamCreation />
        </DashboardNavbar>
      )}
      {activeSection == "reporting" && (
        <DashboardNavbar>
          <Reporting />
        </DashboardNavbar>
      )}
      {activeSection == "member-list" && (
        <DashboardNavbar heading="Member List">
          <MemberList />
        </DashboardNavbar>
      )}
      {(activeSection == "joined-disaster" ||
        activeSection == "past-disaster" ||
        activeSection == "inbox") && (
        <DashboardNavbar heading="Member List">
          <ComingSoon />
        </DashboardNavbar>
      )}
      {activeSection == "profile" && <Profile />}
      {activeSection == "logout" && logout()}
    </ProtectedRoute>
  );
};
