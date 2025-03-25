import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ForgetPass from "./authentication/pages/ForgetPass";
import Login from "./authentication/pages/Login";
import Registration from "./authentication/pages/Registration";
import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";
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
              <DashboardNavbar>
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
          <Route
            path="/sign-up"
            element={
              <Navbar>
                <Registration />
              </Navbar>
            }
          />
          <Route path="/password-recovery" element={<ForgetPass />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
