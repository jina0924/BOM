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
  const patientListTimerID = useRef([]);

  function patientListSuccess(res) {
    setPatientList(res.data.results);
    setCount(res.data.count);
    for (let timer of patientListTimerID.current) {
      clearTimeout(timer);
    }
    patientListTimerID.current = [];
    if (!res.data.next) {
      const timerID = setTimeout(setNow, 5000, 1);
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    } else {
      const timerID = setTimeout(setNow, 5000, now + 1);
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    }
  }

  function patientListFail() {}

  function handlePageChange(page) {
    setNow(page);
  }

  useEffect(() => {
    requestPatientList(now, 9, patientListSuccess, patientListFail);
    return () => {
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
        onOff={true}
      />
    </div>
  );
}

export default PatientsAutoPlay;
