import React, { useState, useEffect } from "react";

// import { useLocation } from "react-router-dom";

import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientSearchBar from "components/molecules/PatientList/PatientSearchBar";
import PatientList from "components/molecules/common/PatientList";

// api
import { requestPatientList, requestSearchPatient } from "api/patients";

function Patients() {
    const [component, setComponent] = useState(0);
    const [patientList, setPatientList] = useState([]);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    function patientListSuccess(res) {
        console.log(res);
        console.log(res.data.results);
        setPatientList(res.data.results);
        setCount(res.data.count);
        setPage(res.data.now);
        setTimeout(requestPatientList, 10000, page, 9, patientListSuccess, patientListFail);
    }

    function patientListFail(err) {
        console.log("실패", err);
    }

    useEffect(() => {
        requestPatientList(page, 9, patientListSuccess, patientListFail);
    }, [page]);

    function handlePageChange(page) {
        setPage(page);
    }

    function onSearch() {
        requestSearchPatient(page, 9, keyword, patientListSuccess, patientListFail);
    }

    function onKeyPressSearch(event) {
        if (event.key === "Enter") {
            requestSearchPatient(page, 9, keyword, patientListSuccess, patientListFail);
        }
    }
    return (
        <>
            {component === 0 && (
                <div className="grid grid-cols-6 bg-back rounded-[20px] shadow-bg w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw] font-suit">
                    <SideBar />
                    <div className="info-zone col-span-5">
                        <HeadBar />
                        <div className="flex flex-col justify-center items-center h-[84vh]">
                            <div className="h-[12vh] w-full">
                                <PatientSearchBar
                                    keyword={keyword}
                                    onChangeInput={e => setKeyword(e.target.value)}
                                    onSearch={onSearch}
                                    onKeyPress={onKeyPressSearch}
                                />
                            </div>
                            <div className="px-8 h-[72vh] pb-4 w-full">
                                <PatientList
                                    patientList={patientList}
                                    page={page}
                                    count={count}
                                    limit={9}
                                    handlePageChange={handlePageChange}
                                    nowPage="patients"
                                    onZoom={() => setComponent(1)}
                                    onOff={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {component === 1 && (
                <div className="w-[97vw] h-[95vh] my-[2.5vh] mx-[1.5vw]">
                    <PatientList
                        patientList={patientList}
                        page={page}
                        count={count}
                        limit={9}
                        handlePageChange={handlePageChange}
                        nowPage="patients"
                        onZoom={() => setComponent(0)}
                        onOff={true}
                    />
                </div>
                // 열 간격, 글자 크기 클래스 prop
            )}
        </>
    );
}

export default Patients;
