import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import { requestPatientList } from "api/patientDetail";

function PatientDetail() {
  const [component, setComponent] = useState(0);
  const [isPC, setIsPC] = useState(true);
  const [ward, setWard] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [nokName, setNokName] = useState("");
  const [nokPhonenumber, setNokPhonenumber] = useState("");
  const [doctor, setDoctor] = useState("");
  const params = useParams();

  useEffect(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, []);

  useEffect(() => {
    requestPatientList(params.id, requestPatientListSuccess, (err) =>
      console.log(err)
    );
  }, [params]);

  setInterval(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, 1000);

  const requestPatientListSuccess = (res) => {
    console.log(res.data);
    setWard(res.data.ward.numbner);
    setUsername(res.data.user.username);
    setName(res.data.name);
    setBirth(res.data.birth);
    setSex(res.data.sex);
    setNokName(res.data.nokName);
    setNokPhonenumber(res.data.nokPhonenumber);
    setDoctor(res.data.doctor.name);
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
                {component === 0 || component === 1 ? (
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
                      onClickFunction={() => {
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
                      onClickFunction={() => {
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
                >
                  <option value="null">기간</option>
                  <option value="0">실시간</option>
                  <option value="1">1 일</option>
                  <option value="1">7 일</option>
                  <option value="2">30 일</option>
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
                    />
                  </div>
                  <div className="right-third-component pb-5 h-1/2">
                    <BodyInfo
                      isPC={isPC}
                      part="산소포화도"
                      onZoom={() => {
                        setComponent(4);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* 디바이스 디테일 페이지 */}
            {component === 1 && (
              <div className="device-detail-full px-10 pb-5 h-[75vh]">
                <div className="live-device-status pb-5 h-[25vh]">
                  <LiveDeviceStatus />
                </div>
                <div className="device-detail-info pb-5 h-[50vh]">
                  <DeviceDetailInfo
                    onZoom={() => {
                      setComponent(0);
                    }}
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
                />
              </div>
            )}
          </div>
        </div>
      )}
      {!isPC && (
        <div className="patient-detail bg-back my-5">
          <div className="log0">
            <Logo logoClassName="justify-center pb-5" />
          </div>
          <div className="patient-detail-info mx-4 mb-4">
            <PatientDetailInfo isPC={isPC} />
          </div>
          <div className="temperature mx-4 mb-4 ">
            <BodyInfo part="체온" isPC={isPC} />
          </div>
          <div className="heartbeat mx-4 mb-4 ">
            <BodyInfo part="심박수" isPC={isPC} />
          </div>
          <div className="oxyzen-percentage mx-4 mb-4 ">
            <BodyInfo part="산소포화도" isPC={isPC} />
          </div>
          <div className="logout-btn mx-4">
            <Btn
              className="patient-body-info w-full h-full bg-white rounded-lg shadow-box p-3 text-main text-sm hover:bg-main hover:text-white focus:outline-none"
              content="로그아웃"
              onClickFunction={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PatientDetail;
