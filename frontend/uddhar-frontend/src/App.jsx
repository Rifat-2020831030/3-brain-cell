import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Navbar, Landing} from "./public/Public";
import Login from "./authentication/pages/Login";
import ForgetPass from "./authentication/ForgetPass";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/password-recovery" element={<ForgetPass />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
