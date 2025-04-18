import { useParams } from "react-router-dom";
import ProtectedRoute from "../authentication/components/ProtectedRoutes";
import CoordinatorDashboard from "../coordinator/pages/CoordinatorDashboard";
import DisasterControl from "../coordinator/pages/DisasterControl";
import DashboardNavbar from "../shared/components/DashboardNavbar";

const CoordinatorRoute = () => {
  const { activeSection } = useParams();

  return (
    <ProtectedRoute roles={["coordinator"]}>
      <DashboardNavbar heading="Coordinator Dashboard">
        <CoordinatorDashboard activeSection={activeSection || "home"} />
      </DashboardNavbar>
    </ProtectedRoute>
  );
};

export default CoordinatorRoute;

export const CreateAnEventRoute = () => {
  return (
    <ProtectedRoute roles={["coordinator"]}>
      <DashboardNavbar heading="Coordinator Dashboard">
        <DisasterControl />
      </DashboardNavbar>
    </ProtectedRoute>
  );
};
