import React from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";

function Doctors() {
  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] m-6 font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
      </div>
    </div>
  );
}

export default Doctors;
