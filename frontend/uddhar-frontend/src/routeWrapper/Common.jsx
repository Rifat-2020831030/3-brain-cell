import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import Profile from "../shared/pages/Profile";
import DashboardNavbar from "../shared/components/DashboardNavbar";

export const ProfileWrapper = () => {
  return (
    <ProtectedRoute roles={['coordinator', 'volunteer', 'organization', 'visitor']} redirectUnauthorized="/unauthorized">
      <DashboardNavbar>
        <Profile />
      </DashboardNavbar>
    </ProtectedRoute>
  );
}