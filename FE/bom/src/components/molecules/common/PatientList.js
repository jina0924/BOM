import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// components
import Title from "components/atoms/Title";
import CustomPagination from "components/atoms/CustomPagination";

// api
// import { requestPatientList } from "api/patients";

import {
  UilArrowResizeDiagonal,
  UilArrowDownLeft,
} from "@iconscout/react-unicons";

function PatientList({
  patientList,
  page,
  count,
  limit,
  handlePageChange,
  nowPage,
  onZoom,
  onOff,
}) {
  // const [patientList, setPatientList] = useState([]);
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(1);
  // const [limit, setLimit] = useState(8);
  const [pathname, setPathname] = useState("");
  // const [component, setComponent] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/main") {
      setPathname("main");
      // 환자리스트 limit=8로 요청보내기
    } else if (location.pathname === "/patients") {
      setPathname("patients");
      // 환자리스트 limit=9로 요청보내기
    }
  }, [location]);

  function onClickPatientDetailInfo(item) {
    navigate(`/patient/${item.number}`);
  }

  return (
    <div className="patient-list h-full shadow-box bg-white rounded-[20px]">
      <div className="h-[10%] pt-6 px-8 flex justify-between">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 목록"
          contentClassName="text-main font-bold text-lg"
        />
        <div className="arrow-box">
          {nowPage === "main" && (
            <Link to="/patients">
              <span className="text-font2 text-sm hover:cursor-pointer hover:text-sub2 hover:font-semibold">
                자세히 보기
              </span>
            </Link>
          )}
          {nowPage === "patients" && onOff === false && (
            <div onClick={onZoom}>
              <UilArrowResizeDiagonal className="text-font2 inline h-[16px] transition delay-150 ease-in-out  hover:cursor-pointer hover:scale-125 duration-300" />
            </div>
          )}
          {nowPage === "patients" && onOff === true && (
            <div onClick={onZoom}>
              <UilArrowDownLeft className="text-font2 inline h-[16px] transition delay-150 ease-in-out hover:cursor-pointer hover:scale-125 duration-300" />
            </div>
          )}
        </div>
      </div>
      <div className="h-[90%] overflow-x-auto">
        <div className="h-full flex flex-col justify-evenly items-center">
          <table className="w-[85%] border-collapse px-4 mx-auto">
            <thead>
              <tr>
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  번호
                </th>
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  환자 번호
                </th>
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  이름
                </th>
                {pathname === "patients" && (
                  <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                    성별
                  </th>
                )}
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  체온
                </th>
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  심박수
                </th>
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  산소포화도
                </th>
                {pathname === "patients" && (
                  <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                    보호자
                  </th>
                )}
                {pathname === "patients" && (
                  <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                    보호자 연락처
                  </th>
                )}
                <th className="text-sm text-center font-normal border-b-[1px] py-2 bg-white">
                  주치의
                </th>
              </tr>
            </thead>
            {!!patientList && (
              <tbody>
                {patientList.map((item, key) => (
                  <tr
                    key={key}
                    className="hover:cursor-pointer hover:bg-back"
                    onClick={() => onClickPatientDetailInfo(item)}
                  >
                    <td
                      className={`text-center font-semibold border-b-[.5px] border-gray 
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"}`}
                    >
                      {key + 1 + limit * (page - 1)}
                    </td>
                    <td
                      className={`text-center font-semibold border-b-[.5px] border-gray 
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"}`}
                    >
                      {item.number}
                    </td>
                    <td
                      className={`text-center font-semibold border-b-[.5px] border-gray 
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"}`}
                    >
                      {item.name}
                    </td>
                    {pathname === "patients" && item.sex === "M" && (
                      <td
                        className={`text-center font-semibold border-b-[.5px] border-gray 
                          ${
                            onOff === true ? "text-sm py-4" : "text-xs py-2.5"
                          }`}
                      >
                        남
                      </td>
                    )}
                    {pathname === "patients" && item.sex === "F" && (
                      <td
                        className={`text-center font-semibold border-b-[.5px] border-gray 
                          ${
                            onOff === true ? "text-sm py-4" : "text-xs py-2.5"
                          }`}
                      >
                        여
                      </td>
                    )}
                    <td
                      className={`text-center font-semibold border-b-[.5px] border-gray
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"}
                        ${item.temperature > 37.5 && "text-sub1"}
                        ${item.temperature < 35 && "text-blue"}`}
                    >
                      {item.temperature}
                      {item.temperature > 37.5 && <span>▲</span>}
                      {item.temperature < 35 && <span>▼</span>}
                    </td>
                    <td
                      className={`text-center font-semibold border-b-[.5px] border-gray 
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"} 
                        ${item.bpm > 100 && "text-sub1"}
                        ${item.bpm < 60 && "text-blue"}
                        `}
                    >
                      {item.bpm}
                      {item.bpm > 100 && <span>▲</span>}
                      {item.bpm < 60 && <span>▼</span>}
                    </td>
                    <td
                      className={`text-center font-semibold border-b-[.5px] border-gray
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"} ${
                        item.oxygenSaturation < 95 && "text-sub1"
                      }
                      `}
                    >
                      {item.oxygenSaturation}
                    </td>
                    {pathname === "patients" && (
                      <td
                        className={`text-center font-semibold border-b-[.5px] border-gray
                          ${
                            onOff === true ? " text-sm py-4" : " text-xs py-2.5"
                          }
                        `}
                      >
                        {item.nokName}
                      </td>
                    )}
                    {pathname === "patients" && (
                      <td
                        className={
                          "text-center font-semibold border-b-[.5px] border-gray" +
                          (onOff === true ? " text-sm py-4" : " text-xs py-2.5")
                        }
                      >
                        {item.nokPhonenumber.replace(
                          /^(\d{2,3})(\d{3,4})(\d{4})$/,
                          `$1-$2-$3`
                        )}
                      </td>
                    )}
                    <td
                      className={
                        "text-center font-semibold border-b-[.5px] border-gray" +
                        (onOff === true ? " text-sm py-4" : " text-xs py-2.5")
                      }
                    >
                      {item.doctor.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {/* pagination */}
          <div className="pagination-number">
            <CustomPagination
              page={page}
              itemsCount={limit}
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

export default PatientList;
