import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Navbar, Landing} from "./public/Public";
import Login from "./authentication/pages/Login";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
