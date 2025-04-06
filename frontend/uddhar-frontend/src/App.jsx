import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ForgetPass from "./authentication/pages/ForgetPass";
import Login from "./authentication/pages/Login";
import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";
import DisasterControl from "./coordinator/pages/DisasterControl";
import { Landing, Navbar } from "./public/Public";
import DashboardNavbar from "./shared/components/DashboardNavbar";

const App = () => {
  return (
    <>
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
              <DashboardNavbar heading="Coordinator Dashboard">
                <CoordinatorDashboard />
              </DashboardNavbar>
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
          <Route path="/password-recovery" element={<ForgetPass />} />
          <Route
            path="/create-a-event"
            element={
              <DashboardNavbar heading="Coordinator Dashboard">
                <DisasterControl />
              </DashboardNavbar>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
