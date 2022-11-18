import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import WardInfo from "components/molecules/Main/WardInfo";
import PatientList from "components/molecules/common/PatientList";
import PatientProgress from "components/molecules/Main/PatientProgress";
import ActiveBed from "components/molecules/Main/ActiveBed";

// api
import { requestWardInfo } from "api/main";
import { requestPatientList } from "api/patients";

import ls from "helper/LocalStorage";

function Main({ isPC }) {
  // 병동 정보
  const [wardName, setWardName] = useState("000");
  const [patientCount, setPatientCount] = useState(1);
  const [doctorCount, setDoctorCount] = useState(1);
  const [nurseCount, setNurseCount] = useState(1);

  // 환자 목록
  const [patientList, setPatientList] = useState([]);
  const [count, setCount] = useState(1);
  const [now, setNow] = useState(1);

  // 입원 환자 추이
  const [patientTendency, setPatientTendency] = useState([]);

  // 병상 가동률
  const [utilization, setUtilization] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  function wardInfoSuccess(res) {
    setWardName(res.data.number);
    setPatientCount(res.data.patientCount);
    setDoctorCount(res.data.doctorCount);
    setNurseCount(res.data.nurseCount);
    setPatientTendency(res.data.tendency);
    setUtilization(res.data.utilization);
  }

  function wardInfoFail() {}

  // 병동 정보 요청
  useEffect(() => {
    requestWardInfo(wardInfoSuccess, wardInfoFail);
  }, []);

  // 환자 리스트 요청
  useEffect(() => {
    requestPatientList(now, 8, patientListSuccess, patientListFail);
    return () => {
      for (let timer of patientListTimerID.current) {
        clearTimeout(timer);
      }
      patientListTimerID.current = [];
    };
  }, [now]);

  const patientListTimerID = useRef([]);

  function patientListSuccess(res) {
    setPatientList(res.data.results);
    setCount(res.data.count);
    for (let timer of patientListTimerID.current) {
      clearTimeout(timer);
    }
    patientListTimerID.current = [];
    if (now === res.data.now) {
      const timerID = setTimeout(
        requestPatientList,
        10000,
        now,
        8,
        patientListSuccess,
        patientListFail
      );
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    }
  }

  function patientListFail() {}

  function handlePageChange(page) {
    console.log("페이지 바꾼다", page);
    setNow(page);
  }

  useEffect(() => {
    checkUserType();
  }, [isPC]);

  const checkUserType = () => {
    const userType = ls.get("userType");
    if (userType === "ward" && !isPC) {
      navigate("/deviceNotSupported");
    } else if (userType === "patient" && isPC) {
      navigate("/deviceNotSupported");
    }
  };

  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
        <div className="information-zone flex flex-col h-[84vh]">
          {/* 병동 정보 카드 */}
          <div className="ward-info-summary-list grid grid-cols-4 p-7 gap-8">
            {/* 병동 정보 */}
            <WardInfo wardInfoTitle="wardName" wardInfoDetail={wardName} />
            {/* 입원 환자 수 */}
            <Link to="/patients">
              <WardInfo
                wardInfoTitle="patientCount"
                wardInfoDetail={patientCount}
              />
            </Link>
            {/* 의사 수 */}
            <Link to="/doctors">
              <WardInfo
                wardInfoTitle="doctorCount"
                wardInfoDetail={doctorCount}
              />
            </Link>
            {/* 간호사 수 */}
            <Link to="/nurses">
              <WardInfo
                wardInfoTitle="nurseCount"
                wardInfoDetail={nurseCount}
              />
            </Link>
          </div>
          {/* 병동 상세 데이터 카드 */}
          <div className="px-7 grid grid-cols-5 gap-8">
            {/* 환자 목록 */}
            <div className="patient-list h-[65vh] col-span-3">
              <PatientList
                nowPage="main"
                patientList={patientList}
                page={now}
                count={count}
                limit={8}
                handlePageChange={handlePageChange}
              />
            </div>
            {/* 병동 데이터 그래프 카드 */}
            <div className="ward-info-graph col-span-2 flex flex-col justify-between">
              {/* 입원 환자 추이 */}
              <div className="patient-progres h-[26vh]">
                <PatientProgress patientTendency={patientTendency} />
                {/* <PatientProgress /> */}
              </div>
              {/* 병상 가동률 */}
              <div className="active-bed h-[36vh]">
                <ActiveBed utilization={utilization} />
                {/* <ActiveBed /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
