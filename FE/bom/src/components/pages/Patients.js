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
  const [component, setComponent] = useState(0);
  const [patientList, setPatientList] = useState([]);
  const [count, setCount] = useState(1);
  const [now, setNow] = useState(1);
  // const now = useRef(1);
  const [keyword, setKeyword] = useState("");
  // const [patientListTimerID, setPatientListTimerID] = useState("");
  const patientListTimerID = useRef([]);

  // 응답받고 데이터 확인해서 쓰지 않는 값이면 setTimeout 걸지 말기
  // 페이지가 같고 키워드가 다를땐?????????????
  function patientListSuccess(res) {
    console.log("응답 받음", res.data.now, res.data, component);
    if (res.data.now === now) {
      setPatientList(res.data.results);
      setCount(res.data.count);
    }
    // page.current = res.data.now;
    for (let timer of patientListTimerID.current) {
      clearTimeout(timer);
    }
    patientListTimerID.current = [];
    console.log("재요청 보냄", now, component);
    if (component === 0) {
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
        console.log("타이머 아이디 바뀜", patientListTimerID.current);
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
        // setPatientListTimerID(timerID);
        // console.log("setTimeout", page, keyword);
        // patientListTimerID.current.push(timerID);
        patientListTimerID.current = [...patientListTimerID.current, timerID];
        console.log("타이머 아이디 바뀜", patientListTimerID.current);
      }
    } else if (component === 1) {
      if (!res.data.next) {
        setNow(() => 1);
        const timerID = setTimeout(
          requestPatientList,
          10000,
          now,
          9,
          patientListSuccess,
          patientListFail
        );
        patientListTimerID.current = [...patientListTimerID.current, timerID];
      } else if (!!res.data.next) {
        setNow(() => now + 1);
        const timerID = setTimeout(
          requestPatientList,
          10000,
          now,
          9,
          patientListSuccess,
          patientListFail
        );
        patientListTimerID.current = [...patientListTimerID.current, timerID];
      }
    }
  }

  function patientListFail(err) {
    console.log("실패", err);
  }

  useEffect(() => {
    console.log("환자 리스트 요청 보냄", now, component);
    requestPatientList(now, 9, patientListSuccess, patientListFail);
    return () => {
      console.log("타이머 kill", patientListTimerID);
      setNow(1);
      for (let timer of patientListTimerID.current) {
        clearTimeout(timer);
      }
      patientListTimerID.current = [];
    };
  }, [component]);

  function handlePageChange(page) {
    console.log(page);
    // console.log("타이머 kill", patientListTimerID);
    // clearTimeout(patientListTimerID.current);
    // setPatientListTimerID("");
    setNow((page) => page);
    requestSearchPatient(now, 9, keyword, patientListSuccess, patientListFail);
  }

  function onSearch() {
    // console.log("타이머 kill", patientListTimerID);
    // clearTimeout(patientListTimerID.current);
    console.log("검색해서 요청 보냄", keyword);
    setNow(() => 1);
    requestSearchPatient(now, 9, keyword, patientListSuccess, patientListFail);
  }

  function onKeyPressSearch(event) {
    if (event.key === "Enter") {
      // console.log("타이머 kill", patientListTimerID);
      // clearTimeout(patientListTimerID.current);
      console.log("엔터 눌러서 검색한다", keyword);
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

  function onZoom() {
    if (component === 0) {
      setComponent(() => 1);
      // for (let timer of patientListTimerID.current) {
      //   clearTimeout(timer);
      // }
      // patientListTimerID.current = [];
    } else if (component === 1) {
      setComponent(() => 0);
      // for (let timer of patientListTimerID.current) {
      //   clearTimeout(timer);
      // }
      // patientListTimerID.current = [];
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
      {component === 0 && (
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
                  onZoom={onZoom}
                  onOff={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {component === 1 && (
        <div className="w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw]">
          <PatientList
            patientList={patientList}
            page={now}
            count={count}
            limit={9}
            handlePageChange={handlePageChange}
            nowPage="patients"
            onZoom={onZoom}
            onOff={true}
          />
        </div>
      )}
    </>
  );
}

export default Patients;
