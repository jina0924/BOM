import React from "react";
import Logo from "components/atoms/Logo";
import MenuItem from "components/atoms/MenuItem";

function SideBar() {
  return (
    <div className="col-span-1 rounded-l-[20px] bg-white shadow-side">
      <Logo logoClassName="pt-7 pl-8 pb-2" />
      <ul className="menu-list">
        <MenuItem menu="home">홈</MenuItem>
        <MenuItem menu="patient">환자 정보</MenuItem>
        <MenuItem menu="doctor">의사 목록</MenuItem>
        <MenuItem menu="nurse">간호사 목록</MenuItem>
      </ul>
    </div>
  );
}

export default SideBar;
