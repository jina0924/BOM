import React from "react";
import Title from "components/atoms/Title.js";
import BMSIcon from "components/atoms/BMSIcon";

function LiveDeviceStatus() {
  return (
    <div className="patient-device-detail-info w-full h-full bg-white p-3 rounded-lg shadow-box">
      <div className="top-box  h-1/4">
        <div className="title-box text-3xl font-extrabold p-3 flex items-center">
          <Title
            iconTag="UilMonitorHeartRate"
            iconTagClassName="text-sub1 inline mr-3"
            content="실시간 BMS 상태"
            contentClassName="text-main font-bold text-lg"
          />
        </div>
      </div>
      <div className="content-box py-2 grid grid-cols-4 h-3/4">
        <div className="BMS-temperature col-span-1 flex justify-center items-center">
          <div className="icon-box h-1/2">
            <BMSIcon iconTag="UilTemperatureHalf" />
          </div>
          <div className="live-info-box pl-4">
            <div className="live-info text-xl font-bold text-main">
              <span>50 ℃</span>
            </div>
            <div className="live-info-name text-sm">
              <span>BMS 온도</span>
            </div>
          </div>
        </div>
        <div className="battery-voltage col-span-1 flex justify-center items-center">
          <div className="icon-box h-1/2">
            <BMSIcon iconTag="UilBatteryBolt" />
          </div>
          <div className="live-info-box pl-4">
            <div className="live-info text-xl font-bold text-main">
              <span>5V | 7V</span>
            </div>
            <div className="live-info-name text-sm">
              <span>배터리 전압</span>
            </div>
          </div>
        </div>
        <div className="battery-power col-span-1 flex justify-center items-center">
          <div className="icon-box h-1/2">
            <BMSIcon iconTag="UilBatteryEmpty" />
          </div>
          <div className="live-info-box pl-4">
            <div className="live-info text-xl font-bold text-main">
              <span>50% | 70%</span>
            </div>
            <div className="live-info-name text-sm">
              <span>배터리 잔량</span>
            </div>
          </div>
        </div>
        <div className="BMS-status col-span-1 flex justify-center items-center">
          <div className="icon-box h-1/2">
            <BMSIcon iconTag="UilCircuit" />
          </div>
          <div className="live-info-box pl-4">
            <div className="live-info text-xl font-bold text-main">
              <span>좋음</span>
            </div>
            <div className="live-info-name text-sm">
              <span>셀 밸런스</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveDeviceStatus;
