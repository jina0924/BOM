import React from "react";
import Main from "components/pages/Main";

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
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}
