import React from "react";

import RouterConfiguration from "./configs/router";
import PatientDetail from "components/pages/PatientDetail";
import ContactBtn from "components/atoms/ContactBtn";

import ls from "helper/LocalStorage";

import { requestAccessToken } from "api/login";

function App() {
  // function getAccessTokenSuccess(res) {
  //   console.log(res);
  // }

  // function getAccessTokenFail(err) {
  //   console.log(err);
  // }

  // setInterval(() => {
  //   // 토큰값 있으면 유효기간마다 토큰 재발급 신청
  //   const refreshToken = ls.get("refreshToken");
  //   if (!!refreshToken) {
  //     requestAccessToken(getAccessTokenSuccess, getAccessTokenFail);
  //   }
  // }, 270000);

  return (
    <div className="App">
      <div className="test">
        {/* <PatientDetail /> */}
        {/* <ContactBtn iconTag="UilPhone" /> */}
      </div>
      <RouterConfiguration />
    </div>
  );
}

export default App;
