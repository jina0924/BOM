import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientSearchBar from "components/molecules/PatientList/PatientSearchBar";
import PatientList from "components/molecules/common/PatientList";

// api
import { requestPatientList, requestSearchPatient } from "api/patients";

import ls from "helper/LocalStorage";

function Patients({ isPC }) {
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [count, setCount] = useState(1);
  const [now, setNow] = useState(1);
  const [keyword, setKeyword] = useState("");
  const patientListTimerID = useRef([]);

  function patientListSuccess(res) {
    setPatientList(res.data.results);
    setCount(res.data.count);
    for (let timer of patientListTimerID.current) {
      clearTimeout(timer);
    }
    patientListTimerID.current = [];
    if (keyword === "" && now === res.data.now) {
      const timerID = setTimeout(
        requestPatientList,
        10000,
        now,
        9,
        patientListSuccess,
        patientListFail
      );
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    } else if (now === res.data.now) {
      const timerID = setTimeout(
        requestSearchPatient,
        10000,
        now,
        9,
        keyword,
        patientListSuccess,
        patientListFail
      );
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    }
  }

  function patientListFail() {}

  useEffect(() => {
    if (keyword) {
      requestSearchPatient(
        now,
        9,
        keyword,
        patientListSuccess,
        patientListFail
      );
    } else {
      requestPatientList(now, 9, patientListSuccess, patientListFail);
    }
    return () => {
      for (let timer of patientListTimerID.current) {
        clearTimeout(timer);
      }
      patientListTimerID.current = [];
    };
  }, [now]);

  function handlePageChange(page) {
    setNow(page);
  }

  function onSearch() {
    setNow(() => 1);
    requestSearchPatient(now, 9, keyword, patientListSuccess, patientListFail);
  }

  function onKeyPressSearch(event) {
    if (event.key === "Enter") {
      setNow(() => 1);
      requestSearchPatient(
        now,
        9,
        keyword,
        patientListSuccess,
        patientListFail
      );
    }
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
    <>
      <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
        <SideBar />
        <div className="info-zone col-span-5">
          <HeadBar />
          <div className="flex flex-col justify-center items-center h-[84vh]">
            <div className="h-[12vh] w-full">
              <PatientSearchBar
                keyword={keyword}
                onChangeInput={(e) => setKeyword(e.target.value)}
                onSearch={onSearch}
                onKeyPress={onKeyPressSearch}
              />
            </div>
            <div className="px-8 h-[72vh] pb-4 w-full">
              <PatientList
                patientList={patientList}
                page={now}
                count={count}
                limit={9}
                handlePageChange={handlePageChange}
                nowPage="patients"
                onOff={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Patients;
