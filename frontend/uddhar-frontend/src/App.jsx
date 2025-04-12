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

const App = () => {
  // Wrapper to extract activeSection from route params, default to "Home"
  const CoordinatorDashboardWrapper = () => {
    const { activeSection } = useParams();
    return (
      <DashboardNavbar heading="Coordinator Dashboard">
        <CoordinatorDashboard activeSection={activeSection || "home"} />
      </DashboardNavbar>
    );
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
                  <CoordinatorDashboardWrapper />
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
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
