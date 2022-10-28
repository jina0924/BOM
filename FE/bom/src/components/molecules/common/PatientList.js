import React, { useState, useEffect } from "react";

import Title from "components/atoms/Title";

const tempPatientLiST = {
  count: 7,
  next: 3,
  previous: 1,
  results: [
    {
      pk: 1,
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
      pk: 2,
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
      pk: 3,
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
      pk: 4,
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
      pk: 5,
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
      pk: 6,
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
      pk: 7,
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
      pk: 8,
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
  // const [patientListData, setPatientListData] = useState({});
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    // setPatientListData(tempPatientLiST);
    setPatientList(tempPatientLiST.results);
  }, []);

  return (
    <div
      className={`patient-list shadow-box bg-white rounded-[20px] h-[62vh] ${patientListClassName}`}
    >
      <div className="patient-list-content py-4 px-6">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 목록"
          contentClassName="text-main font-bold text-lg"
        />
        <table className="table-auto">
          <thead>
            <tr>
              <th className="text-sm font-normal">환자 번호</th>
              <th className="text-sm font-normal">이름</th>
              <th className="text-sm font-normal">체온</th>
              <th className="text-sm font-normal">심박수</th>
              <th className="text-sm font-normal">산소포화도</th>
              <th className="text-sm font-normal">주치의</th>
            </tr>
          </thead>
          <tbody>
            {!!patientList && (
              <>
                {patientList.map((item, key) => (
                  <tr key={key}>
                    <td>{item.pk}</td>
                    <td>{item.name}</td>
                    <td>{item.status_temperature}</td>
                    <td>{item.status_bpm}</td>
                    <td>{item.oxygen_saturation}</td>
                    <td>{item.doctor_name}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
