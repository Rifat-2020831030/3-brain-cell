import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Navbar, Landing} from "./public/Public";
import Login from "./authentication/pages/Login";
import ForgetPass from "./authentication/pages/ForgetPass";
import OrgDashboard from "./organization/pages/OrgDashboard";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/password-recovery" element={<ForgetPass />} />
          <Route path="/dashboard/organization" element={<OrgDashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
