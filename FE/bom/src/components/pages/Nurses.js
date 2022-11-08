import { React, useState, useEffect } from "react";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import ProfileCard from "components/molecules/common/ProfileCard";
import CustomPagination from "components/atoms/CustomPagination";

import { requestNurseList } from "api/nurses";

function Nurses() {
  const [isPC, setIsPC] = useState(true);
  const [count, setCount] = useState(0);
  const [nurses, setNurses] = useState([]);
  const [now, setNow] = useState(1);

  useEffect(() => {
    requestNurseList("", requestNurseListSuccess, (err) => console.log(err));
  }, []);

  const requestNurseListSuccess = (res) => {
    setCount(res.data.count);
    setNurses(res.data.results);
    setNow(res.data.now);
  };

  const handlePageChange = (page) => {
    setNow(page);
    const params = { page: page };
    requestNurseList(params, requestNurseListSuccess, (err) =>
      console.log(err)
    );
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
                <div
                  key={id}
                  className="profile-box col-span-1 px-2 pb-2 h-[34vh]"
                >
                  <ProfileCard person={nurse} />
                </div>
              );
            })}
          </div>
          <div className="pagination-box h-[8vh] flex items-center justify-center">
            <CustomPagination
              page={now}
              itemsCount={10}
              totalCount={count}
              pageRange={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nurses;
