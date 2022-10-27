import React from "react";

// components
import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientDetailInfo from "components/molecules/PatientDetail/PatientDetailInfo";
import DownloadBtn from "components/atoms/DownloadBtn";

function PatientDetail() {
  return (
    <div className="patient-detail grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[93vh] m-7">
      <SideBar />
      <div className="right-box col-span-5 h-[full]">
        <HeadBar />
        <div className="filter-download-btn-box flex justify-end my-5 mx-10 h-[9.3vh]">
          <select name="기간" id="기간">
            기간
          </select>
          <DownloadBtn />
        </div>
        <div className="components grid grid-cols-5 mx-10 h-[74.4vh]">
          <div className="components-left col-span-2">
            <div className="first-component mr-5 h-1/2">
              <PatientDetailInfo />
            </div>
            <div className="second-component h-1/2">2</div>
          </div>
          <div className="components-right col-span-3">3</div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetail;
