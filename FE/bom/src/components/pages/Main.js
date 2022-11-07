import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import WardInfo from "components/molecules/Main/WardInfo";
import PatientList from "components/molecules/common/PatientList";
import PatientProgress from "components/molecules/Main/PatientProgress";
import ActiveBed from "components/molecules/Main/ActiveBed";

// api
import { requestPatientList } from "api/patients";

function Main() {
  // 데이터 받아오면 초기값 수정할 것
  const [wardName, setWardName] = useState("5");
  const [countPatients, setCountPatients] = useState(10);
  const [countDoctors, setDoctors] = useState(10);
  const [countNurses, setNurses] = useState(10);
  const [patientList, setPatientList] = useState([]);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  function patientListSuccess(res) {
    const patientList = res.data.results;
    const count = res.data.count;
    const page = res.data.now;
    setPatientList(patientList);
    setCount(count);
    setPage(page);
  }

  function patientListFail(err) {
    console.log(err);
  }

  useEffect(() => {
    requestPatientList(page, 8, patientListSuccess, patientListFail);
  }, [page]);

  function handlePageChange(page) {
    setPage(page);
  }

  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar wardNum={wardName} />
        <div className="information-zone flex flex-col">
          {/* 병동 정보 카드 */}
          <div className="ward-info-summary-list grid grid-cols-4 p-7 gap-8">
            {/* 병동 정보 */}
            <WardInfo wardInfoTitle="wardName" wardInfoDetail={wardName} />
            {/* 입원 환자 수 */}
            <Link to="/patients">
              <WardInfo
                wardInfoTitle="countPatients"
                wardInfoDetail={countPatients}
              />
            </Link>
            {/* 의사 수 */}
            <Link to="/doctors">
              <WardInfo
                wardInfoTitle="countDoctors"
                wardInfoDetail={countDoctors}
              />
            </Link>
            {/* 간호사 수 */}
            <Link to="/nurses">
              <WardInfo
                wardInfoTitle="countNurses"
                wardInfoDetail={countNurses}
              />
            </Link>
          </div>
          {/* 병동 상세 데이터 카드 */}
          <div className="px-7 grid grid-cols-5 gap-8">
            {/* 환자 목록 */}
            <div className="patient-list h-[62vh] col-span-3">
              <PatientList
                nowPage="main"
                patientList={patientList}
                page={page}
                count={count}
                limit={8}
                handlePageChange={handlePageChange}
              />
            </div>
            {/* 병동 데이터 그래프 카드 */}
            <div className="ward-info-graph col-span-2 flex flex-col justify-between">
              {/* 입원 환자 추이 */}
              <div className="patient-progres h-[22vh]">
                <PatientProgress />
              </div>
              {/* 병상 가동률 */}
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
