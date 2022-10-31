import React, { useState, useEffect } from "react";
import Logo from "components/atoms/Logo";
import MenuItem from "components/atoms/MenuItem";

import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const [menuIndex, setMenuIndex] = useState("");

  console.log(menuIndex);

  useEffect(() => {
    if (location.pathname === "/main") {
      setMenuIndex(0);
    } else if (location.pathname === `/patients`) {
      setMenuIndex(1);
    } else if (location.pathname === "/doctors") {
      setMenuIndex(2);
    } else if (location.pathname === "/nurses") {
      setMenuIndex(3);
    }
  }, [location]);

  return (
    <div className="col-span-1 rounded-l-[20px] bg-white shadow-side">
      <Logo logoClassName="pt-7 pl-8 pb-4" />
      <ul className="menu-list">
        <Link to="/main">
          <MenuItem menu="home" isActive={menuIndex === 0 ? true : false}>
            홈
          </MenuItem>
        </Link>
        <Link to="/patients">
          <MenuItem menu="patient" isActive={menuIndex === 1 ? true : false}>
            환자 정보
          </MenuItem>
        </Link>
        <Link to="/doctors">
          <MenuItem menu="doctor" isActive={menuIndex === 2 ? true : false}>
            의사 목록
          </MenuItem>
        </Link>
        <Link to="/nurses">
          <MenuItem menu="nurse" isActive={menuIndex === 3 ? true : false}>
            간호사 목록
          </MenuItem>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
