import React from "react";

import Input from "components/atoms/Input";
import Btn from "components/atoms/Btn";

function PatientSearchBar() {
  return (
    <div className="searchbar-box flex justify-between items-center h-full py-4">
      <div className="input-box h-full">
        <Input
          type="text"
          className="bg-white rounded-[20px] w-[67vw] shadow-box px-4 h-full"
          placeholder="환자 번호나 이름으로 검색하기"
          value=""
          onKeyUp=""
        />
      </div>
      <div className="btn-box col-span-1 h-full">
        <Btn
          className="text-white font-semibold bg-main shadow-loginbtn rounded-[20px] w-[7.5vw] h-full"
          onClick=""
          content="검색"
        />
      </div>
    </div>
  );
}

export default PatientSearchBar;
