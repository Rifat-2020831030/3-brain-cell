import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Navbar, Landing} from "./public/Public";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
