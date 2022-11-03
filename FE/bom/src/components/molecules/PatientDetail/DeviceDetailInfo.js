import React from "react";
import Title from "components/atoms/Title.js";
import Graph from "components/atoms/Graph";

function DeviceDetailInfo() {
  return (
    <div className="patient-device-detail-info w-full h-full bg-white rounded-lg shadow-box p-3">
      <div className="top-box flex justify-between pt-4 px-6 h-[20%]">
        <Title
          iconTag="UilMonitorHeartRate"
          iconTagClassName="text-sub1 inline mr-3"
          content="BMS 상세 정보"
          contentClassName="text-main text-lg"
        />
      </div>
      <div className="content-box grid grid-cols-2 px-5 py-2 h-[80%]">
        <div className="left-content-box col-span-1 h-full px-2">
          <div className="voltage-box shadow-dark rounded-[20px] w-full h-full">
            <div className="title-box flex justify-center items-center text-lg text-main font-bold h-[20%]">
              <span>배터리 전압</span>
            </div>
            <div className="graph-box h-[80%] flex items-center">
              <Graph part="전압" isPC={true} />
            </div>
          </div>
        </div>
        <div className="left-content-box col-span-1 h-full px-2">
          <div className="voltage-box shadow-dark rounded-[20px] w-full h-full">
            <div className="title-box flex justify-center items-center text-lg text-main font-bold h-[20%]">
              <span>BMS 온도</span>
            </div>
            <div className="graph-box h-[80%] flex items-center">
              <Graph part="온도" isPC={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetailInfo;
