import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./authentication/pages/Login";
import { Landing } from "./public/Public";
import DashboardNavbar from "./shared/components/DashboardNavbar";
import Navbar from "./shared/components/Navbar";

import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";

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
        </Routes>
      </Router>
    </>
  );
};

export default App;
