import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

// component
import PatientList from "components/molecules/common/PatientList";

// api
import { requestPatientList } from "api/patients";

import ls from "helper/LocalStorage";

function PatientsAutoPlay({ isPC }) {
  const navigate = useNavigate();

  const [patientList, setPatientList] = useState([]);
  const [count, setCount] = useState(1);
  const [now, setNow] = useState(1);
  // const [next, setNext] = useState("");
  const patientListTimerID = useRef([]);

  function patientListSuccess(res) {
    console.log("요청에 응답 받음", res.data);
    setPatientList(res.data.results);
    setCount(res.data.count);
    // setNext(res.data.next);
    for (let timer of patientListTimerID.current) {
      clearTimeout(timer);
    }
    patientListTimerID.current = [];
    if (!res.data.next) {
      // setNow(1);
      console.log("맨 처음 페이지로 요청 보낼 예정");
      const timerID = setTimeout(setNow, 5000, 1);
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    } else {
      // setNow(now + 1);
      console.log(`${now}다음 페이지로 요청 보낼 예정`);
      const timerID = setTimeout(setNow, 5000, now + 1);
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    }
    // const timerID = setTimeout(
    //   requestPatientList,
    //   10000,
    //   now,
    //   9,
    //   patientListSuccess,
    //   patientListFail
    // );
    // patientListTimerID.current = [...patientListTimerID.current, timerID]
  }

  function patientListFail(err) {
    console.log("요청 실패", err);
  }

  function handlePageChange(page) {
    setNow(page);
  }

  useEffect(() => {
    console.log(`${now}번째 환자리스트 요청보냄`);
    requestPatientList(now, 9, patientListSuccess, patientListFail);
    return () => {
      console.log(`타이머 kill: ${patientListTimerID.current}`);
      for (let timer of patientListTimerID.current) {
        clearTimeout(timer);
      }
      patientListTimerID.current = [];
    };
  }, [now]);

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
    <div className="w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw]">
      <PatientList
        patientList={patientList}
        page={now}
        count={count}
        limit={9}
        handlePageChange={handlePageChange}
        nowPage="patientsAutoPlay"
        // onZoom={onZoom}
        onOff={true}
      />
    </div>
  );
}

export default PatientsAutoPlay;
