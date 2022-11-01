import React from "react";

import Input from "components/atoms/Input";
import Btn from "components/atoms/Btn";

function PatientSearchBar() {
  return (
    <div className="searchbar-box grid grid-cols-10">
      <div className="input-box col-span-9">
        <Input
          type=""
          className="bg-white rounded-[20px] w-full shadow-box h-full"
          placeholder=""
          value=""
          onKeyUp=""
        />
      </div>
      <div className="btn-box col-span-1">
        <Btn
          className="text-white bg-main shadow-loginbtn rounded-[20px]"
          onClick=""
          content="검색"
        />
      </div>
    </div>
  );
}

export default PatientSearchBar;
