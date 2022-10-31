import React from "react";
import Main from "components/pages/Main";
import Login from "components/pages/Login";
import PatientDetail from "components/pages/PatientDetail";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

export default function RouterConfiguration() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
      </Routes>
    </Router>
  );
}
