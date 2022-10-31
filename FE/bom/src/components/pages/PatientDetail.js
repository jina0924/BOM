import { useState, React } from "react";

// components
import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientDetailInfo from "components/molecules/PatientDetail/PatientDetailInfo";
import DownloadBtn from "components/atoms/DownloadBtn";
import DeviceSummary from "components/molecules/PatientDetail/DeviceSummary";
import BodyInfo from "components/molecules/PatientDetail/BodyInfo";
import LiveDeviceStatus from "components/molecules/PatientDetail/LiveDeviceStatus";
import DeviceDetailInfo from "components/molecules/PatientDetail/DeviceDetailInfo";

function PatientDetail() {
  const [component, setComponent] = useState(0);

  return (
    <div className="patient-detail grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] m-6 font-suit">
      <SideBar />
      <div className="right-box col-span-5 h-full">
        <HeadBar />
        <div className="filter-download-btn-box flex justify-end py-5 px-10 h-[9vh] text-xs">
          <select
            name="기간"
            id="기간"
            className="flex justify-center items-center px-4 rounded-xl bg-white shadow-bg ml-5 focus:outline-none"
          >
            <option value="null">기간</option>
            <option value="0">1 달</option>
            <option value="1">1 주</option>
            <option value="2">1 일</option>
          </select>
          <DownloadBtn />
        </div>
        {/* 전체 서머리 페이지 */}
        {component === 0 && (
          <div className="components grid grid-cols-5 px-10 h-[75vh]">
            <div className="components-left col-span-2">
              <div className="left-first-component pr-8 pb-8 h-[35vh]">
                <PatientDetailInfo />
              </div>
              <div className="left-second-component pr-8 pb-5 h-[40vh]">
                <DeviceSummary
                  onZoom={() => {
                    setComponent(1);
                  }}
                />
              </div>
            </div>
            <div className="components-right col-span-3 h-full">
              <div className="right-first-component pb-5 h-1/3">
                <BodyInfo
                  part="체온"
                  onZoom={() => {
                    setComponent(2);
                  }}
                />
              </div>
              <div className="right-second-component pb-5 h-1/3">
                <BodyInfo
                  part="심박수"
                  onZoom={() => {
                    setComponent(3);
                  }}
                />
              </div>
              <div className="right-third-component pb-5 h-1/3">
                <BodyInfo
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
  );
}

export default PatientDetail;
