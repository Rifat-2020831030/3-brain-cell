import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./authentication/context/AuthContext";
import ForgetPass from "./authentication/pages/ForgetPass";
import Login from "./authentication/pages/Login";
import Registration from "./authentication/pages/Registration";
import Unauthorized from "./authentication/pages/UnAuthorized";
import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";
import { Landing, Navbar } from "./public/Public";
import DashboardNavbar from "./shared/components/DashboardNavbar";
import ProtectedRoute from "./authentication/components/ProtectedRoutes";

const App = () => {
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
              path="/dashboard/coordinator"
              element={
                <ProtectedRoute roles={["coordinator"]}>
                  <DashboardNavbar />
                  <CoordinatorDashboard />
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
