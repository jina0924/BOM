import React from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import ProfileCard from "components/molecules/common/ProfileCard";

function Nurses() {
  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] m-[2.5vh] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
        <div className="nurses-box h-[75vh] px-10">
          <div className="first-head-box h-[10vh] flex items-center text-main text-xl font-extrabold">
            <span>1병동 간호사 목록</span>
          </div>
          <div className="profiles-box h-[65vh]">2</div>
        </div>
        <ProfileCard />
      </div>
    </div>
  );
}

export default Nurses;
