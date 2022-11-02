import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Title from "components/atoms/Title";
import CustomPagination from "components/atoms/CustomPagination";

import { requestPatientList } from "api/nurse/patients";

const tempPatientLiST = {
  count: 158,
  next: "",
  previous: "",
  results: [
    {
      pk: "0001",
      name: "임진경",
      age: 80,
      gender: "M",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0002",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0003",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0004",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0005",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0006",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0007",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
    {
      pk: "0008",
      name: "임진경",
      age: 5,
      gender: "F",
      status_temperature: 36.5,
      status_bpm: 129,
      oxygen_saturation: 100,
      nok_name: "임진경",
      nok_phonenumber: "01012345678",
      doctor_name: "임진경",
    },
  ],
};

function PatientList({ patientListClassName }) {
  const [patientList, setPatientList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [patient, setPatient] = useState({});
  const [pathname, setPathname] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/main") {
      setPathname("main");
      // 환자리스트 limit=8로 요청보내기
    } else if (location.pathname === "/patients") {
      setPathname("patients");
      // 환자리스트 limit=9로 요청보내기
    }
  }, [location]);

  function patientListSuccess(res) {
    console.log(res);
  }

  function patientListFail(err) {
    console.log(err);
  }

  function onClickPatientDetailInfo(event) {
    event.preventDefault();
    requestPatientList("225070001", patientListSuccess, patientListFail);
  }

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPatientList(tempPatientLiST.results);
    setCount(tempPatientLiST.count);
    setNext(tempPatientLiST.next);
    setPrevious(tempPatientLiST.previous);
  }, []);

  return (
    <div
      className={`patient-list h-full shadow-box bg-white rounded-[20px] ${patientListClassName}`}
    >
      <div className="h-[10%] pt-6 px-8">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 목록"
          contentClassName="text-main font-bold text-lg"
        />
      </div>
      <div className="h-[90%] overflow-x-auto">
        <div className="h-full flex flex-col justify-evenly items-center">
          <table className="table w-[85%] border-collapse px-4 mx-auto">
            <thead>
              <tr>
                <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                  환자 번호
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                  이름
                </th>
                {pathname === "patients" && (
                  <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                    나이
                  </th>
                )}
                {pathname === "patients" && (
                  <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                    성별
                  </th>
                )}
                <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                  체온
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                  심박수
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                  산소포화도
                </th>
                {pathname === "patients" && (
                  <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                    보호자
                  </th>
                )}
                {pathname === "patients" && (
                  <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                    보호자 연락처
                  </th>
                )}
                <th className="text-sm font-normal border-b-[1px] py-2 bg-white">
                  주치의
                </th>
              </tr>
            </thead>
            {!!patientList && (
              <tbody>
                {patientList.map((item, key) => (
                  <tr key={key} className="" onClick={onClickPatientDetailInfo}>
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.pk}
                    </td>
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.name}
                    </td>
                    {pathname === "patients" && (
                      <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                        {item.age}
                      </td>
                    )}
                    {pathname === "patients" && item.gender === "M" && (
                      <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                        남
                      </td>
                    )}
                    {pathname === "patients" && item.gender === "F" && (
                      <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                        여
                      </td>
                    )}
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.status_temperature}
                    </td>
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.status_bpm}
                    </td>
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.oxygen_saturation}
                    </td>
                    {pathname === "patients" && (
                      <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                        {item.nok_name}
                      </td>
                    )}
                    {pathname === "patients" && (
                      <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                        {item.nok_phonenumber.replace(
                          /^(\d{2,3})(\d{3,4})(\d{4})$/,
                          `$1-$2-$3`
                        )}
                      </td>
                    )}
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.doctor_name}
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
              itemsCount={8}
              totalCount={count}
              pageRange={5}
              onChange={handlePageChange}
            />
            {/* <Pagination
              activePage={page}
              itemsCountPerPage={8}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientList;
