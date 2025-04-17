import { Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";

import ProtectedRoute from "./authentication/components/ProtectedRoutes";
import { AuthProvider } from "./authentication/context/AuthContext";
import ForgetPass from "./authentication/pages/ForgetPass";
import Login from "./authentication/pages/Login";
import Registration from "./authentication/pages/Registration";
import Unauthorized from "./authentication/pages/UnAuthorized";
import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";
import DisasterControl from "./coordinator/pages/DisasterControl";
import { Landing, Navbar } from "./public/Public";
import DashboardNavbar from "./shared/components/DashboardNavbar";
import Volunteer from "./volunteer/pages/Volunteer";
import OrgDashboard from "./organization/pages/OrgDashboard";
import Proptypes from "prop-types";

const App = () => {
  // Wrapper to extract activeSection from route params, default to "Home"
  const CoordinatorDashboardWrapper = ({ activeSection }) => (
    <DashboardNavbar heading="Coordinator Dashboard">
      <CoordinatorDashboard activeSection={activeSection || "home"} />
    </DashboardNavbar>
  );
  CoordinatorDashboardWrapper.propTypes = {
    activeSection: Proptypes.string,
  };
  const CoordinatorDashboardContainer = () => {
    const { activeSection } = useParams();
    return <CoordinatorDashboardWrapper activeSection={activeSection} />;
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Navbar>
                  <Landing />
                </Navbar>
              }
            />
            <Route
              path="/dashboard/coordinator/:activeSection?"
              element={
                <ProtectedRoute roles={["coordinator"]}>
                  <CoordinatorDashboardContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Navbar>
                  <Login />
                </Navbar>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Navbar>
                  <Registration />
                </Navbar>
              }
            />
            <Route path="/password-recovery" element={<ForgetPass />} />
            <Route
              path="/create-a-event"
              element={
                <ProtectedRoute roles={["coordinator"]}>
                  <DashboardNavbar heading="Coordinator Dashboard">
                    <DisasterControl />
                  </DashboardNavbar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <Navbar>
                  <Unauthorized />
                </Navbar>
              }
            />
            <Route
              path="/dashboard/volunteer"
              element={
                <ProtectedRoute roles={["volunteer"]}>
                  <DashboardNavbar heading="Volunteer Dashboard">
                      <Volunteer />
                  </DashboardNavbar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/organization"
              element={
                <ProtectedRoute roles={["organization"]}>
                  <DashboardNavbar heading="Organization Dashboard">
                      <OrgDashboard />
                  </DashboardNavbar>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
