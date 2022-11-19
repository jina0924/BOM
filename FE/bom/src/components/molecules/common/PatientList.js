import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// components
import Title from "components/atoms/Title";
import CustomPagination from "components/atoms/CustomPagination";

import "./patientListCarouselEffect.css";

import {
  UilArrowResizeDiagonal,
  UilArrowDownLeft,
  UilInfoCircle,
} from "@iconscout/react-unicons";

function PatientList({
  patientList,
  page,
  count,
  limit,
  handlePageChange,
  nowPage,
  onOff,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [pathname, setPathname] = useState("");
  const [fade, setFade] = useState("");

  useEffect(() => {
    if (location.pathname === "/main") {
      setPathname("main");
    } else if (
      (location.pathname === "/patients") |
      (location.pathname === "/patients/autoplay")
    ) {
      setPathname("patients");
    }
  }, [location]);

  useEffect(() => {
    const to = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      clearTimeout(to);
      setFade("");
    };
  }, [page]);

  function onClickPatientDetailInfo(item) {
    navigate(`/patient/${item.number}`);
  }

  return (
    <div className="patient-list h-full shadow-box bg-white rounded-[20px]">
      <div className="h-[10%] pt-6 px-8 flex justify-between">
        <div className="patient-list-title flex items-center">
          <Title
            iconTag="UilMedicalDrip"
            iconTagClassName="text-sub1 inline mr-3"
            content="환자 목록"
            contentClassName="text-main font-bold text-lg mr-3"
          />
          <span
            className="tooltip tooltip-right text-font2 flex justify-center items-center font-light"
            data-tip="체온, 심박수가 정상 수치를 초과하면 ▲, 미만이면 ▼가 나타납니다"
          >
            <UilInfoCircle className="h-5/6 w-5/6" />
          </span>
        </div>
        <div className="arrow-box">
          {nowPage === "main" && (
            <Link to="/patients">
              <span className="text-font2 text-sm hover:cursor-pointer hover:text-sub2 hover:font-semibold">
                자세히 보기
              </span>
            </Link>
          )}
          {nowPage === "patients" && (
            <Link to="/patients/autoplay">
              <UilArrowResizeDiagonal className="text-font2 inline h-[16px] transition delay-150 ease-in-out  hover:cursor-pointer hover:scale-125 duration-300" />
            </Link>
          )}
          {nowPage === "patientsAutoPlay" && (
            <Link to="/patients">
              <UilArrowDownLeft className="text-font2 inline h-[16px] transition delay-150 ease-in-out hover:cursor-pointer hover:scale-125 duration-300" />
            </Link>
          )}
        </div>
      </div>
      <div className="h-[90%] overflow-x-auto">
        <div className="h-full flex flex-col justify-evenly items-center">
          <table className={`w-[85%] border-collapse px-4 mx-auto ${fade}`}>
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
                        ${onOff === true ? "text-sm py-4" : "text-xs py-2.5"}
                        ${item.isWarning && "text-sub1"}`}
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
