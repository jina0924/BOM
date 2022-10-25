import React from "react";
import Logo from "components/atoms/Logo";
import MenuItem from "components/atoms/MenuItem";

function SideBar() {
  return (
    <div className="col-span-1 rounded-l-[20px] bg-white shadow-side">
      <Logo />
      <MenuItem menu="home">홈</MenuItem>
      <MenuItem menu="patient">환자 목록</MenuItem>
      <MenuItem menu="doctor">의사 목록</MenuItem>
      <MenuItem menu="nurse">간호사 목록</MenuItem>
    </div>
  );
}

export default SideBar;
