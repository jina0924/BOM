import React from "react";

import Title from "components/atoms/Title";

function ActiveBed() {
  return (
    <div className="active-bed shadow-box bg-white rounded-[20px] h-[37vh] pr-5">
      <div className="active-bed-content py-4 px-6">
        <Title
          iconTag="UilBed"
          iconTagClassName="text-sub1 inline mr-3"
          content="병상 가동률"
          contentClassName="text-main font-bold text-lg"
        />
      </div>
    </div>
  );
}

export default ActiveBed;
