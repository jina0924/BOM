import React, { useState, useEffect } from "react";

import Title from "components/atoms/Title";
import CustomPagination from "components/atoms/CustomPagination";

import { requestPatientList } from "api/patients";

const tempPatientLiST = {
  count: 158,
  next: "",
  previous: "",
  results: [
    {
      pk: "0001",
      name: "임진경",
      age: 5,
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
      gender: "M",
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
      gender: "M",
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
      gender: "M",
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
      gender: "M",
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
      gender: "M",
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
      gender: "M",
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
      gender: "M",
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
          <table className="table-fixed w-[85%] border-collapse px-4 mx-auto">
            <thead>
              <tr>
                <th className="text-sm font-normal border-b-[1px] py-2">
                  환자 번호
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2">
                  이름
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2">
                  체온
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2">
                  심박수
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2">
                  산소포화도
                </th>
                <th className="text-sm font-normal border-b-[1px] py-2">
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
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.status_temperature}
                    </td>
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.status_bpm}
                    </td>
                    <td className="text-center text-xs font-semibold border-b-[.5px] border-gray py-2.5">
                      {item.oxygen_saturation}
                    </td>
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
