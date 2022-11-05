import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientSearchBar from "components/molecules/PatientList/PatientSearchBar";
import PatientList from "components/molecules/common/PatientList";
import { useEffect } from "react";

function Patients() {
  const location = useLocation();
  const [patientListBtn, setPatientListBtn] = useState(0);
  const [component, setComponent] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") {
      setPatientListBtn(1);
    } else if (location.pathname === "/patients") {
      setPatientListBtn(2);
    }
  });

  useEffect(() => {
    console.log(component);
  }, [component]);

  return (
    <>
      {component === 0 && (
        <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
          <SideBar />
          <div className="info-zone col-span-5">
            <HeadBar />
            <div className="flex flex-col justify-center items-center h-[84vh]">
              <div className="h-[12vh] w-full">
                <PatientSearchBar />
              </div>
              <div className="px-8 h-[72vh] pb-4 w-full">
                <PatientList
                  nowPage="patients"
                  onZoom={() => setComponent(1)}
                  onOff={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {component === 1 && (
        <div className="w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw]">
          <PatientList
            nowPage="patients"
            onZoom={() => setComponent(0)}
            onOff={true}
          />
        </div>
      )}
    </>
  );
}

export default Patients;
