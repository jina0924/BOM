import React from "react";

import Title from "components/atoms/Title";
import DonutGraph from "components/atoms/DonutGraph";

function ActiveBed() {
  return (
    <div className="active-bed shadow-box bg-white rounded-[20px] h-full pr-5">
      <div className="active-bed-title h-1/6 py-4 px-6">
        <Title
          iconTag="UilBed"
          iconTagClassName="text-sub1 inline mr-3"
          content="병상 가동률"
          contentClassName="text-main font-bold text-lg"
        />
      </div>
      <div className="active-bed-graph h-5/6">
        <DonutGraph />
      </div>
    </div>
  );
}

export default ActiveBed;
