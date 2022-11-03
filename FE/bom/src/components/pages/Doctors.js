import React from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import ProfileCard from "components/molecules/common/ProfileCard";
import CustomPagination from "components/atoms/CustomPagination";

function Doctors() {
  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] m-[2.5vh] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
        <div className="nurses-box h-[84vh] px-10">
          <div className="first-head-box h-[8vh] flex items-center text-main text-lg font-extrabold px-2">
            <span>1병동 주치의 목록</span>
          </div>
          <div className="profiles-box h-[68vh] grid grid-cols-5">
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2">
              <ProfileCard />
            </div>
          </div>
          <div className="pagination-box h-[8vh] flex items-center justify-center">
            <CustomPagination
              page={1}
              itemsCount={8}
              totalCount={80}
              pageRange={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
