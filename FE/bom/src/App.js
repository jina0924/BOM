import React from "react";

import RouterConfiguration from "./configs/router";
import PatientDetail from "components/pages/PatientDetail";
import ContactBtn from "components/atoms/ContactBtn";
import DeviceNotSupport from "components/pages/DeviceNotSupport";

function App() {
  return (
    <div className="App">
      <div className="test">
        {/* <PatientDetail /> */}
        {/* <ContactBtn iconTag="UilPhone" /> */}
        {/* <DeviceNotSupport /> */}
      </div>
      <RouterConfiguration />
    </div>
  );
}

export default App;
