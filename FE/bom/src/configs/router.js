import React from "react";
import Main from "components/pages/Main";
import Login from "components/pages/Login";
import Patients from "components/pages/Patients";
import PatientDetail from "components/pages/PatientDetail";
import Nurses from "components/pages/Nurses";
import Doctors from "components/pages/Doctors";
import Test from "components/pages/Test";

import ls from "helper/LocalStorage";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

function checkAuth() {
  // 병동 로그인인지 환자 번호 로그인인지 구분할 것
  return !!ls.get("accessToken");
}

function CheckAuth({ children }) {
  if (checkAuth()) return children;
  return <Navigate to="/login" />;
}

export default function RouterConfiguration() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <CheckAuth>
              <Main />
            </CheckAuth>
          }
        />
        <Route
          path="/patients"
          element={
            <CheckAuth>
              <Patients />
            </CheckAuth>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <CheckAuth>
              <PatientDetail />
            </CheckAuth>
          }
        />
        <Route
          path="/doctors"
          element={
            <CheckAuth>
              <Doctors />
            </CheckAuth>
          }
        />
        <Route
          path="/nurses"
          element={
            <CheckAuth>
              <Nurses />
            </CheckAuth>
          }
        />
      </Routes>
    </Router>
  );
}
