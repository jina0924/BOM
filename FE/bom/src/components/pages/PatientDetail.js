import React from "react";

// components
import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientDetailInfo from "components/molecules/PatientDetail/PatientDetailInfo";

function PatientDetail() {
  return (
    <div className="patient-detail grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[93vh] m-7">
      <SideBar />
      <div className="right-box col-span-5">
        <HeadBar />
        <div className="components"></div>
      </div>
    </div>
  );
}

export default PatientDetail;
