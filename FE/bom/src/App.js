import React from "react";

import RouterConfiguration from "./configs/router";
import PatientDetail from "components/pages/PatientDetail";
import ContactBtn from "components/atoms/ContactBtn";

function App() {
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
