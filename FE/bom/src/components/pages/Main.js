import React, { useState } from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import WardInfo from "components/molecules/Main/WardInfo";

function Main() {
  // 데이터 받아오면 초기값 수정할 것
  const [wardName, setWardName] = useState("5");
  const [countPatients, setCountPatients] = useState(10);
  const [countDoctors, setDoctors] = useState(10);
  const [countNurses, setNurses] = useState(10);

  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[94vh] m-7">
      <SideBar />
      <div className="col-span-5">
        <HeadBar />
        <div className="ward-info-list grid grid-cols-4 m-7 gap-8">
          <WardInfo wardInfoTitle="wardName" wardInfoDetail={wardName} />
          <WardInfo
            wardInfoTitle="countPatients"
            wardInfoDetail={countPatients}
          />
          <WardInfo
            wardInfoTitle="countDoctors"
            wardInfoDetail={countDoctors}
          />
          <WardInfo wardInfoTitle="countNurses" wardInfoDetail={countNurses} />
        </div>
      </div>
    </div>
  );
}

export default Main;
