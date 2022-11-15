import React from "react";
import Main from "components/pages/Main";
import Login from "components/pages/Login";
import Patients from "components/pages/Patients";
import PatientsAutoPlay from "components/pages/PatientsAutoPlay";
import PatientDetail from "components/pages/PatientDetail";
import Nurses from "components/pages/Nurses";
import Doctors from "components/pages/Doctors";
import Test from "components/pages/Test";
import DeviceNotSupport from "components/pages/DeviceNotSupport";

import ls from "helper/LocalStorage";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useState, useEffect } from "react";
import PageNotFound from "components/pages/PageNotFound";

function checkAuth() {
  // 병동 로그인인지 환자 번호 로그인인지 구분할 것
  if (ls.get("accessToken") && ls.get("userType") === "ward") {
    return 0;
  } else if (ls.get("accessToken") && ls.get("userType") === "patient") {
    return 1;
  } else {
    return 2;
  }
}

function CheckAuth({ children }) {
  if (checkAuth() === 0) {
    return children;
  } else if (checkAuth() === 1) {
    if (
      children.type.name === "PatientDetail" &&
      ls.get("number") === +window.location.pathname.substring(9)
    ) {
      return children;
    } else {
      return <Navigate to={`/patient/${ls.get("number")}`} />;
    }
  } else {
    ls.clear();
    return <Navigate to="/login" />;
  }
}

export default function RouterConfiguration() {
  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 1180 && !isPC) {
      setIsPC(true);
    } else if (window.innerWidth <= 1180 && isPC) {
      setIsPC(false);
    }
  }, []);

  setInterval(() => {
    if (window.innerWidth > 1180 && !isPC) {
      setIsPC(true);
    } else if (window.innerWidth <= 1180 && isPC) {
      setIsPC(false);
    }
  }, 1000);

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login isPC={isPC} />} />
        <Route
          path="/"
          element={
            <CheckAuth>
              <Main isPC={isPC} />
            </CheckAuth>
          }
        />
        <Route
          path="/patients"
          element={
            <CheckAuth>
              <Patients isPC={isPC} />
            </CheckAuth>
          }
        />
        <Route
          path="/patients/autoplay"
          element={
            <CheckAuth>
              <PatientsAutoPlay isPC={isPC} />
            </CheckAuth>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <CheckAuth>
              <PatientDetail isPC={isPC} />
            </CheckAuth>
          }
        />
        <Route
          path="/doctors"
          element={
            <CheckAuth>
              <Doctors isPC={isPC} />
            </CheckAuth>
          }
        />
        <Route
          path="/nurses"
          element={
            <CheckAuth>
              <Nurses isPC={isPC} />
            </CheckAuth>
          }
        />
        <Route
          path="/deviceNotSupported"
          element={<DeviceNotSupport isPC={isPC} />}
        />
        <Route path="/404" element={<PageNotFound isPC={isPC} />} />
        <Route path="*" element={<PageNotFound isPC={isPC} />} />
      </Routes>
    </Router>
  );
}
