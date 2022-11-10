import React, { useState, useEffect, useRef } from "react";

import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

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

function useInterval(callback, delay, page = 1) {
  const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (page !== null) {
      // 만약 delay가 null이 아니라면
      let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [page]); // delay가 바뀔 때마다 새로 실행된다.
}

// custom timeout
function useCustomInterval(request, delay, page, cycle) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = request;
  }, [request]);

  useEffect(() => {
    function requestData() {
      console.log("요청 보냄");
      savedCallback.current();
    }
    if (page !== null && cycle) {
      let id = setTimeout(requestData, delay);
      console.log("요청보낸 타이머 아이디", id);
      return () => {
        console.log(id);
        clearTimeout(id);
      };
    }
  }, [page, cycle]);
}

function Main({ isPC }) {
  // 병동 정보
  const [wardName, setWardName] = useState("000");
  const [patientCount, setPatientCount] = useState(1);
  const [doctorCount, setDoctorCount] = useState(1);
  const [nurseCount, setNurseCount] = useState(1);

  // 환자 목록
  const [patientList, setPatientList] = useState([]);
  const [count, setCount] = useState(1);
  // const [page, setPage] = useState(1);
  const page = useRef(1);

  // 입원 환자 추이
  const [patientTendency, setPatientTendency] = useState([]);

  // 병상 가동률
  const [utilization, setUtilization] = useState(1);

  // 병동 정보 타이머 ID
  // const [wardInfoTimerID, setWardInfoTimerID] = useState("");
  // const wardInfoTimerID = useRef("");

  // 순환 도는지 확인할 변수
  // const [wardInfoCycle, setWardInfoCycle] = useState(1);

  const navigate = useNavigate();

  function wardInfoSuccess(res) {
    console.log("병동 정보", res);
    setWardName(res.data.number);
    setPatientCount(res.data.patientCount);
    setDoctorCount(res.data.doctorCount);
    setNurseCount(res.data.nurseCount);
    setPatientTendency(res.data.tendency);
    setUtilization(res.data.utilization);
    // setWardInfoCycle(wardInfoCycle + 1);
    // console.log(wardInfoCycle);
    // const timerID = setTimeout(
    //   requestWardInfo,
    //   3000,
    //   wardInfoSuccess,
    //   wardInfoFail
    // );
    // wardInfoTimerID.current = timerID;
    // console.log("타이머 아이디", wardInfoTimerID);
    // setWardInfoTimerID(timerID);
  }

  function wardInfoFail(err) {
    console.lor("실패", err);
  }

  // useInterval(() => {
  //   requestWardInfo(wardInfoSuccess, wardInfoFail);
  // }, 10000);

  // useCustomInterval(
  //   () => {
  //     requestWardInfo(wardInfoSuccess, wardInfoFail);
  //   },
  //   3000,
  //   1,
  //   wardInfoCycle
  // );

  useEffect(() => {
    requestWardInfo(wardInfoSuccess, wardInfoFail);
    // console.log("최초 요청 보냄");
    // requestPatientList(page, 8, patientListSuccess, patientListFail);
    // return () => {
    //   console.log(wardInfoTimerID.current);
    //   clearTimeout(wardInfoTimerID.current);
    // };
  }, []);

  // Timer ID
  // const [patientListTimerID, setPatientListTimerID] = useState("");
  // const patientListTimerID = useRef("");

  // const [patientListCycle, setPatientListCycle] = useState(1);
  // const patientListCycle = useRef(1);

  // const [patientListCycle, setPatientListCycle] = useState(1);
  // const patientListCycle = useRef(1);

  function patientListSuccess(res) {
    console.log("환자 리스트", page, res);
    const patientList = res.data.results;
    const count = res.data.count;
    const now = res.data.now;
    setPatientList(patientList);
    setCount(count);
    // setPage(now);
    page.current = now;
    // patientListCycle.current = patientListCycle.current + 1;
    // console.log(patientListCycle.current);
    // clearTimeout(patientListTimerID.current);
    // const timerID = setTimeout(
    //   requestPatientList,
    //   1000,
    //   now,
    //   8,
    //   patientListSuccess,
    //   patientListFail
    // );
    // patientListTimerID.current = timerID;
    // console.log("환자 리스트 타이머 아이디", timerID);
    // setPatientListTimerID(timerID);
  }

  function patientListFail(err) {
    console.log(err);
  }

  useEffect(() => {
    console.log("환자 리스트 요청 보냄");
    requestPatientList(page.current, 8, patientListSuccess, patientListFail);
    const patientListId = setInterval(() => {
      requestPatientList(page.current, 8, patientListSuccess, patientListFail);
      console.log("interval 요청 보냄");
    }, 10000);
    return () => {
      console.log(patientListId);
      clearInterval(patientListId);
    };
    // return () => {
    //   console.log(patientListTimerID.current);
    //   clearTimeout(patientListTimerID.current);
    // };
    // }, [page.current]);
  }, []);

  // useInterval(
  //   () => {
  //     requestPatientList(page.current, 8, patientListSuccess, patientListFail);
  //   },
  //   10000,
  //   page
  // );

  // useCustomInterval(
  //   () => {
  //     requestPatientList(page, 8, patientListSuccess, patientListFail);
  //   },
  //   3000,
  //   page,
  //   patientListCycle.current
  // );

  function handlePageChange(clickedPage) {
    console.log("페이지 바꾼다", clickedPage);
    // console.log(patientListTimerID.current);
    // clearTimeout(patientListTimerID.current);
    // patientListTimerID.current = "";
    // setPatientListTimerID("");
    // setPatientListCycle(1);
    // patientListCycle.current = 1;
    // setPage(page);
    page.current = clickedPage;
    console.log("페이지 바뀜", page);
  }

  // // url 정보
  // const location = useLocation();
  // const temp = location.pathname;
  // useEffect(() => {
  //   console.log("타이머 아이디", wardInfoTimerID, patientListTimerID);
  //   return () => {
  //     clearTimeout(patientListTimerID);
  //     setPatientListTimerID(null);
  //     clearTimeout(wardInfoTimerID);
  //     setWardInfoTimerID(null);
  //   };
  // }, []);

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
        <div className="information-zone flex flex-col">
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
            <div className="patient-list h-[62vh] col-span-3">
              <PatientList
                nowPage="main"
                patientList={patientList}
                page={page.current}
                count={count}
                limit={8}
                handlePageChange={handlePageChange}
              />
            </div>
            {/* 병동 데이터 그래프 카드 */}
            <div className="ward-info-graph col-span-2 flex flex-col justify-between">
              {/* 입원 환자 추이 */}
              <div className="patient-progres h-[24vh]">
                <PatientProgress patientTendency={patientTendency} />
                {/* <PatientProgress /> */}
              </div>
              {/* 병상 가동률 */}
              <div className="active-bed h-[35vh]">
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
