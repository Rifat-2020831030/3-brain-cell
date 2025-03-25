import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./authentication/pages/Login";
import DashboardNavbar from "./shared/components/DashboardNavbar";
import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";
import {Navbar, Landing} from "./public/Public";
import ForgetPass from "./authentication/pages/ForgetPass";
import OrgDashboard from "./organization/pages/OrgDashboard";

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
          <Route path="/dashboard/organization" element={<OrgDashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
