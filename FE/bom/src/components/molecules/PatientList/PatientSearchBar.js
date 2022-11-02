import React, { useState } from "react";

import Input from "components/atoms/Input";
import Btn from "components/atoms/Btn";

import { UilSearch } from "@iconscout/react-unicons";

function PatientSearchBar() {
  const [inputValue, setInputValue] = useState("");

  function onChangeInput(event) {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    console.log(inputValue);
  }

  return (
    <div className="searchbar-box flex justify-between items-center h-full py-4">
      <div className="input-box h-full flex items-center">
        <UilSearch className="text-base text-main absolute ml-4" size={22} />
        <Input
          type="text"
          className="bg-white rounded-[20px] w-[67vw] shadow-box px-12 h-[50px] focus:outline-none placeholder:text-sm"
          placeholder="환자 번호나 이름으로 검색하기"
          onKeyUp=""
          value={inputValue}
          onChange={onChangeInput}
        />
      </div>
      <div className="btn-box col-span-1 h-[50px]">
        <Btn
          className="text-white font-semibold bg-main shadow-loginbtn rounded-[20px] w-[8vw] h-full"
          onClick=""
          content="검색"
        />
      </div>
    </div>
  );
}

export default PatientSearchBar;
