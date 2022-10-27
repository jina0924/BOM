import React from "react";
import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";

function Main() {
  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[94vh] m-7">
      <SideBar />
      <div className="col-span-5">
        <HeadBar />
      </div>
    </div>
  );
}

export default Main;
