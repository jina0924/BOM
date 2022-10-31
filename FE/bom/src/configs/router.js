import React from "react";
import Main from "components/pages/Main";
import Login from "components/pages/Login";
import Patients from "components/pages/Patients";
import PatientDetail from "components/pages/PatientDetail";
import Nurses from "components/pages/Nurses";
import Doctors from "components/pages/Doctors";

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
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path="/nurses" element={<Nurses />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </Router>
  );
}
