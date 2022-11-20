import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import ProfileCard from "components/molecules/common/ProfileCard";
import CustomPagination from "components/atoms/CustomPagination";

import { requestDoctorList } from "api/doctors";

import ls from "helper/LocalStorage";

function Doctors({ isPC }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [doctors, setDoctors] = useState([]);
  // const [now, setNow] = useState(1);
  const now = useRef(1);

  const wardNum = ls.get("number");

  useEffect(() => {
    requestDoctorList("", requestDoctorListSuccess, () => {});
  }, []);

  const requestDoctorListSuccess = (res) => {
    setCount(res.data.count);
    setDoctors(res.data.results);
    // setNow(res.data.now);
  };

  const handlePageChange = (page) => {
    // setNow(page);
    now.current = page;
    const params = { page: page };
    requestDoctorList(params, requestDoctorListSuccess, () => {});
  };

  useEffect(() => {
    checkUserType();
  }, [isPC]);

  const checkUserType = () => {
    const userType = ls.get("userType");
    if (userType === "ward" && !isPC) {
      navigate("/deviceNotSupported");
    } else if (userType === "patient" && isPC) {
      navigate("/deviceNotSupported");
    }
  };

  return (
    <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
      <SideBar />
      <div className="info-zone col-span-5">
        <HeadBar />
        <div className="nurses-box h-[84vh] px-10">
          <div className="first-head-box h-[8vh] flex items-center text-main text-lg font-extrabold px-2">
            <span>{wardNum} 병동 주치의 목록</span>
          </div>
          <div className="profiles-box h-[68vh] grid grid-cols-5">
            {doctors.map((doctor, id, array) => {
              return (
                <div
                  key={id}
                  className="profile-box col-span-1 px-2 pb-2 h-[34vh]"
                >
                  <ProfileCard person={doctor} />
                </div>
              );
            })}
          </div>
          <div className="pagination-box h-[8vh] flex items-center justify-center">
            <CustomPagination
              page={now.current}
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

export default Doctors;
