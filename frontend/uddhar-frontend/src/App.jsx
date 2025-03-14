import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Navbar, Landing} from "./public/Public";
import Login from "./authentication/pages/Login";
import ForgetPass from "./authentication/ForgetPass";
import Registration from "./authentication/pages/Registration";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/password-recovery" element={<ForgetPass />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
