import React from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientSearchBar from "components/molecules/PatientList/PatientSearchBar";
import PatientList from "components/molecules/common/PatientList";

function Patients() {
  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] m-[2.5vh] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
        <div className="flex flex-col justify-center items-center h-[84vh]">
          <div className="h-[10vh] w-full px-8">
            <PatientSearchBar />
          </div>
          <div className="px-8 h-[74vh] pb-4">
            <PatientList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
