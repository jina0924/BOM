import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom";
import ls from "helper/LocalStorage";
import { useNavigate } from "react-router-dom";

// components
import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientDetailInfo from "components/molecules/PatientDetail/PatientDetailInfo";
import DownloadBtn from "components/atoms/DownloadBtn";
import DeviceSummary from "components/molecules/PatientDetail/DeviceSummary";
import BodyInfo from "components/molecules/PatientDetail/BodyInfo";
import LiveDeviceStatus from "components/molecules/PatientDetail/LiveDeviceStatus";
import DeviceDetailInfo from "components/molecules/PatientDetail/DeviceDetailInfo";
import Logo from "components/atoms/Logo";
import Btn from "components/atoms/Btn";

// API
import {
  requestPatientDetail,
  requestPatientDetailDeviceInfo,
  requestPatientDetailHealthInfo,
} from "api/patientDetail";
import { requestLogout } from "api/account";
import { useRef } from "react";

function PatientDetail({ isPC }) {
  const navigate = useNavigate();
  // url 상 환자번호
  const params = useParams();
  // 컴포넌트 번호
  const [isHealth, setIsHealth] = useState(true);
  const [component, setComponent] = useState(0);
  // 타이머
  const [patientDetailTimerID, setPatientDetailTimerID] = useState("");
  const TimerID = useRef();
  // 환자정보
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [nokName, setNokName] = useState("");
  const [nokPhonenumber, setNokPhonenumber] = useState("");
  const [doctor, setDoctor] = useState("");
  // 환자 건강 정보
  const [liveTemperature, setLiveTemperature] = useState(0);
  const [liveBPM, setLiveBPM] = useState(0);
  const [liveOxygen, setLiveOxyzen] = useState(0);
  const [filter, setFilter] = useState({ period: "now" });
  const filterRef = useRef({ period: "now" });
  const [temperatureData, setTemperatureData] = useState([]);
  const [heartbeatData, setHeartbeatData] = useState([]);
  const [oxyzenData, setOxyzenData] = useState([]);
  // 환자 디바이스 정보
  const [bmsTemperature, setBmsTemperature] = useState(0);
  const [voltage1, setVoltage1] = useState(0);
  const [voltage2, setVoltage2] = useState(0);
  const [soc1, setSoc1] = useState(0);
  const [soc2, setSoc2] = useState(0);
  const [bmsTemperatureData, setBmsTemperatureData] = useState([]);
  const [voltage1Data, setVoltage1Data] = useState([]);
  const [voltage2Data, setVoltage2Data] = useState([]);

  useEffect(() => {
    const userType = ls.get("userType");
    if (userType === "ward" && isPC) {
      requestPatientDetail(params.id, requestPatientDetailSuccess, (err) =>
        console.log(err)
      );
      requestPatientDetailDeviceInfo(
        params.id,
        filterRef.current,
        requestPatientDetailDeviceInfoSuccess,
        (err) => console.log(err)
      );
      requestPatientDetailHealthInfo(
        params.id,
        filterRef.current,
        requestPatientDetailHealthInfoSuccess,
        (err) => console.log(err)
      );

      // const IntervalID = setInterval(() => {
      //   requestPatientDetailHealthInfo(
      //     params.id,
      //     filterRef.current,
      //     requestPatientDetailHealthInfoSuccess,
      //     (err) => console.log(err)
      //   );
      //   requestPatientDetailDeviceInfo(
      //     params.id,
      //     filterRef.current,
      //     requestPatientDetailDeviceInfoSuccess,
      //     (err) => console.log(err)
      //   );
      // }, 10000);
      // TimerID.current = IntervalID;

      // if (!isHealth) {
      //   requestPatientDetailDeviceInfo(
      //     params.id,
      //     filterRef.current,
      //     requestPatientDetailDeviceInfoSuccess,
      //     (err) => console.log(err)
      //   );

      //   const IntervalID = setInterval(() => {
      //     requestPatientDetailDeviceInfo(
      //       params.id,
      //       filterRef.current,
      //       requestPatientDetailDeviceInfoSuccess,
      //       (err) => console.log(err)
      //     );
      //   }, 1000);
      //   deviceTimerID.current = IntervalID;
      // }
    }
    if (userType === "patient" && !isPC) {
      requestPatientDetail(null, requestPatientDetailSuccess, (err) =>
        console.log(err)
      );
      requestPatientDetailHealthInfo(
        null,
        null,
        requestPatientDetailHealthInfoSuccess,
        (err) => console.log(err)
      );
    }
    return () => {
      clearInterval(TimerID.current);
    };
  }, []);

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

  const requestPatientDetailSuccess = (res) => {
    setUsername(res.data.number);
    setName(res.data.name);
    setBirth(res.data.birth);
    setSex(res.data.sex);
    setNokName(res.data.nokName);
    setNokPhonenumber(res.data.nokPhonenumber);
    setDoctor(res.data.doctor.name);
  };

  const requestPatientDetailHealthInfoSuccess = (res) => {
    console.log(res, filterRef.current);
    setLiveTemperature(res.data.실시간.체온);
    setLiveBPM(res.data.실시간.심박수);
    setLiveOxyzen(res.data.실시간.산소포화도);
    setTemperatureData(res.data.체온);
    setHeartbeatData(res.data.심박수);
    setOxyzenData(res.data.산소포화도);
    // const userType = ls.get("userType");
    // if (userType === "ward") {
    //   const newTimerID = setTimeout(
    //     requestPatientDetailHealthInfo,
    //     3000,
    //     params.id,
    //     filter.current,
    //     requestPatientDetailHealthInfoSuccess,
    //     (err) => console.log(err)
    //   );
    //   timerID.current = newTimerID;
    // }
    // if (userType === "patient") {
    //   // clearTimeout(patientDetailTimerID);
    //   const timerID = setTimeout(
    //     requestPatientDetailHealthInfo,
    //     1000,
    //     null,
    //     null,
    //     requestPatientDetailHealthInfoSuccess,
    //     (err) => console.log(err)
    //   );
    //   setPatientDetailTimerID(timerID);
    // }
  };

  const requestPatientDetailDeviceInfoSuccess = (res) => {
    console.log(res, filterRef.current);
    setBmsTemperature(res.data.실시간.온도);
    setVoltage1(res.data.실시간.전압1);
    setVoltage2(res.data.실시간.전압2);
    setSoc1(res.data.실시간.잔량1);
    setSoc2(res.data.실시간.잔량2);
    setBmsTemperatureData(res.data.온도);
    // const timerID = setTimeout(
    //   requestPatientDetailDeviceInfo,
    //   10000,
    //   params.id,
    //   filter,
    //   requestPatientDetailDeviceInfoSuccess,
    //   (err) => console.log(err)
    // );
    // setPatientDetailTimerID(timerID);
  };

  const selectPeriod = (event) => {
    console.log(TimerID);
    // setPatientDetailTimerID("");
    const period = { period: event.target.value };
    filterRef.current = period;
  };

  const clickComponent = (number) => {
    clearTimeout(patientDetailTimerID);
    setComponent(number);
    if (number === 0) {
      requestPatientDetailHealthInfo(
        params.id,
        filter,
        requestPatientDetailHealthInfoSuccess,
        (err) => console.log(err)
      );
    } else {
      // 디바이스 정보 불러오기 API
      requestPatientDetailDeviceInfo(
        params.id,
        null,
        requestPatientDetailDeviceInfoSuccess,
        (err) => console.log(err)
      );
    }
  };

  const clickLogout = () => {
    requestLogout(requestLogoutSuccess, (err) => {
      console.log(err);
    });
  };

  const requestLogoutSuccess = () => {
    ls.clear();
    navigate("/login");
  };

  return (
    <>
      {isPC && (
        <div className="patient-detail grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] m-[2.5vh] font-suit">
          <SideBar />
          <div className="right-box col-span-5 h-full">
            <HeadBar />
            <div className="filter-download-btn-box flex justify-between pr-10 h-[9vh] text-xs items-center">
              <div className="device-btn-box pl-10">
                {(component === 0) | (component === 1) ? (
                  <div className="info-change-btns flex justify-start">
                    <Btn
                      className={`${
                        component === 1 &&
                        "flex justify-center items-center px-4 py-2 h-[2rem] rounded-xl w-28 mr-3 focus:outline-none bg-white text-font1 shadow-bg  hover:bg-main/20 hover:text-main"
                      } 
                      ${
                        component === 0 &&
                        "flex justify-center items-center px-4 py-2 h-[2rem] rounded-xl w-28 mr-3 focus:outline-none bg-main/20 text-main shadow-bg font-bold"
                      }
                        `}
                      content="환자 정보"
                      onClick={() => {
                        setComponent(0);
                      }}
                    />
                    <Btn
                      className={`${
                        component === 0 &&
                        "flex justify-center items-center px-4 py-2 h-[2rem] rounded-xl w-28  focus:outline-none bg-white text-font1 shadow-bg  hover:bg-main/20 hover:text-main"
                      } 
                    ${
                      component === 1 &&
                      "flex justify-center items-center px-4 py-2 h-[2rem] rounded-xl  w-28 focus:outline-none bg-main/20 text-main shadow-bg font-bold"
                    }
                      `}
                      content="디바이스 정보"
                      onClick={() => {
                        setComponent(1);
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="filter-download-btn flex justify-end">
                <select
                  name="기간"
                  id="기간"
                  className="flex justify-center items-center px-4 rounded-xl bg-white shadow-bg ml-5 focus:outline-none h-[2rem]"
                  onChange={selectPeriod}
                >
                  <option value="now">실시간</option>
                  <option value="day">1 일</option>
                  <option value="week">7 일</option>
                  <option value="month">30 일</option>
                </select>
                <DownloadBtn />
              </div>
            </div>
            {/* 전체 서머리 페이지 */}
            {component === 0 && (
              <div className="components grid grid-cols-2 px-10 h-[75vh]">
                <div className="components-left col-span-1">
                  <div className="left-first-component pr-8 pb-8 h-1/2">
                    <PatientDetailInfo
                      username={username}
                      name={name}
                      birth={birth}
                      sex={sex}
                      nokName={nokName}
                      nokPhonenumber={nokPhonenumber}
                      doctor={doctor}
                    />
                  </div>
                  <div className="left-second-component pr-8 pb-5 h-1/2">
                    <BodyInfo
                      isPC={isPC}
                      part="체온"
                      onZoom={() => {
                        setComponent(2);
                      }}
                      liveData={liveTemperature}
                      data={temperatureData}
                      filter={filterRef.current}
                    />
                  </div>
                </div>
                <div className="components-right col-span-1">
                  <div className="right-second-component pb-8 h-1/2">
                    <BodyInfo
                      isPC={isPC}
                      part="심박수"
                      onZoom={() => {
                        setComponent(3);
                      }}
                      liveData={liveBPM}
                      data={heartbeatData}
                      filter={filterRef.current}
                    />
                  </div>
                  <div className="right-third-component pb-5 h-1/2">
                    <BodyInfo
                      isPC={isPC}
                      part="산소포화도"
                      onZoom={() => {
                        setComponent(4);
                      }}
                      liveData={liveOxygen}
                      data={oxyzenData}
                      filter={filterRef.current}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* 디바이스 디테일 페이지 */}
            {component === 1 && (
              <div className="device-detail-full px-10 pb-5 h-[75vh]">
                <div className="live-device-status pb-5 h-[25vh]">
                  <LiveDeviceStatus
                    bmsTemperature={bmsTemperature}
                    voltage1={voltage1}
                    voltage2={voltage2}
                    soc1={soc1}
                    soc2={soc2}
                  />
                </div>
                <div className="device-detail-info pb-5 h-[50vh]">
                  <DeviceDetailInfo
                    onZoom={() => {
                      setComponent(0);
                    }}
                    bmsTemperatureData={bmsTemperatureData}
                    filter={filterRef.current}
                  />
                </div>
              </div>
            )}
            {/* 체온 디테일 페이지 */}
            {component === 2 && (
              <div className="body-temperature-full px-10 pb-5 h-[75vh]">
                <BodyInfo
                  part="체온"
                  onZoom={() => {
                    setComponent(0);
                  }}
                  onOff={true}
                  liveData={liveTemperature}
                  data={temperatureData}
                  filter={filterRef.current}
                />
              </div>
            )}
            {/* 심박수 디테일 페이지 */}
            {component === 3 && (
              <div className="body-temperature-full px-10 pb-5 h-[75vh]">
                <BodyInfo
                  part="심박수"
                  onZoom={() => {
                    setComponent(0);
                  }}
                  onOff={true}
                  liveData={liveBPM}
                  data={heartbeatData}
                  filter={filterRef.current}
                />
              </div>
            )}
            {/* 산소포화도 디테일 페이지 */}
            {component === 4 && (
              <div className="body-temperature-full px-10 pb-5 h-[75vh]">
                <BodyInfo
                  part="산소포화도"
                  onZoom={() => {
                    setComponent(0);
                  }}
                  onOff={true}
                  liveData={liveOxygen}
                  data={oxyzenData}
                  filter={filterRef.current}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {!isPC && (
        <div className="patient-detail bg-back py-5">
          <div className="log0">
            <Logo logoClassName="justify-center pb-5" />
          </div>
          <div className="patient-detail-info mx-4 mb-4">
            <PatientDetailInfo
              isPC={isPC}
              username={username}
              name={name}
              birth={birth}
              sex={sex}
              nokName={nokName}
              nokPhonenumber={nokPhonenumber}
              doctor={doctor}
            />
          </div>
          <div className="temperature mx-4 mb-4 ">
            <BodyInfo
              part="체온"
              isPC={isPC}
              liveData={liveTemperature}
              data={temperatureData}
            />
          </div>
          <div className="heartbeat mx-4 mb-4 ">
            <BodyInfo
              part="심박수"
              isPC={isPC}
              liveData={liveBPM}
              data={heartbeatData}
            />
          </div>
          <div className="oxyzen-percentage mx-4 mb-4 ">
            <BodyInfo
              part="산소포화도"
              isPC={isPC}
              liveData={liveOxygen}
              data={oxyzenData}
            />
          </div>
          <div className="logout-btn mx-4">
            <Btn
              className="patient-body-info w-full h-full bg-white rounded-lg shadow-box p-3 text-main text-sm hover:bg-main hover:text-white focus:outline-none"
              content="로그아웃"
              onClick={clickLogout}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PatientDetail;
