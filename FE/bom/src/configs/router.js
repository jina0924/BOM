import React from "react";
import Main from "components/pages/Main";
import Login from "components/pages/Login";

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
      </Routes>
    </Router>
  );
}
