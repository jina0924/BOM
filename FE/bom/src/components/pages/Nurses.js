import { React, useState, useEffect } from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import ProfileCard from "components/molecules/common/ProfileCard";
import CustomPagination from "components/atoms/CustomPagination";

import { requestNurseList } from "api/nurses";

function Nurses() {
  const [isPC, setIsPC] = useState(true);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [nurses, setNurses] = useState([]);
  const [now, setNow] = useState(1);

  useEffect(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, []);

  setInterval(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, 1000);

  useEffect(() => {
    requestNurseList("", requestPatientListSuccess, (err) => console.log(err));
  }, []);

  useEffect(() => {}, []);

  const requestPatientListSuccess = (res) => {
    console.log(res);
    setCount(res.data.count);
    setNext(res.data.next);
    setPrevious(res.data.previous);
    setNurses(res.data.results);
    setNow(res.data.now);
  };

  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
        <div className="nurses-box h-[84vh] px-10">
          <div className="first-head-box h-[8vh] flex items-center text-main text-lg font-extrabold px-2">
            <span>1병동 간호사 목록</span>
          </div>
          <div className="profiles-box h-[68vh] grid grid-cols-5">
            {nurses.map((nurse, id, array) => {
              return (
                <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
                  <ProfileCard nurse={nurse} />
                </div>
              );
            })}
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
              <ProfileCard />
            </div>
            <div className="profile-box col-span-1 px-2 pb-2 h-[34vh]">
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

export default Nurses;
