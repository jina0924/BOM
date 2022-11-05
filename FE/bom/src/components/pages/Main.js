import React, { useState } from "react";

import { Link } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import WardInfo from "components/molecules/Main/WardInfo";
import PatientList from "components/molecules/common/PatientList";
import PatientProgress from "components/molecules/Main/PatientProgress";
import ActiveBed from "components/molecules/Main/ActiveBed";

function Main() {
  // 데이터 받아오면 초기값 수정할 것
  const [wardName, setWardName] = useState("5");
  const [countPatients, setCountPatients] = useState(10);
  const [countDoctors, setDoctors] = useState(10);
  const [countNurses, setNurses] = useState(10);

  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar wardNum={wardName} />
        <div className="information-zone flex flex-col">
          <div className="ward-info-summary-list grid grid-cols-4 p-7 gap-8">
            <WardInfo wardInfoTitle="wardName" wardInfoDetail={wardName} />
            <Link to="/patients">
              <WardInfo
                wardInfoTitle="countPatients"
                wardInfoDetail={countPatients}
              />
            </Link>
            <Link to="/doctors">
              <WardInfo
                wardInfoTitle="countDoctors"
                wardInfoDetail={countDoctors}
              />
            </Link>
            <Link to="/nurses">
              <WardInfo
                wardInfoTitle="countNurses"
                wardInfoDetail={countNurses}
              />
            </Link>
          </div>
          <div className="px-7 grid grid-cols-5 gap-8">
            <div className="patient-list h-[62vh] col-span-3">
              <PatientList />
            </div>
            <div className="ward-info-graph col-span-2 flex flex-col justify-between">
              <div className="patient-progres h-[22vh]">
                <PatientProgress />
              </div>
              <div className="active-bed h-[37vh]">
                <ActiveBed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
