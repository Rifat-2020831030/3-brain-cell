import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Navbar, Landing} from "./public/Public";

import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
