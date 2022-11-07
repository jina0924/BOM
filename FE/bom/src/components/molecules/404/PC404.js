import Btn from "components/atoms/Btn";
import React from "react";
import Logo from "components/atoms/Logo";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ls from "helper/LocalStorage";

function PC404({ userType = "guest" }) {
  const navigate = useNavigate();
  const [btnContent, setBtnContent] = useState("");
  const [btnOnclick, setBtnOnClick] = useState();

  const a = () => {
    navigate(`/patient/${ls.get("number")}`);
  };

  const toPatientDetail = () => {
    navigate(`/patient/${ls.get("number")}`);
  };

  useEffect(() => {
    if (userType === "guest") {
      setBtnContent("로그인");
      setBtnOnClick(() => {
        navigate("/login");
      });
    }
    if (userType === "patient") {
      setBtnContent("환자조회");
      // setBtnOnClick(a);
    }
    if (userType === "ward") {
      setBtnContent("홈으로");
      setBtnOnClick(() => {
        // navigate("/");
      });
    }
    userType === "patient" && setBtnContent("환자 조회");
    userType === "ward" && setBtnContent("홈으로");
  }, []);

  return (
    <div className="404 bg-back w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="404-box w-4/5 h-4/5 bg-white rounded-[20px] shadow-box flex flex-col justify-center">
        <div className="logo-box flex justify-center pb-5">
          <Logo disabled={true} size="xl" />
        </div>
        <div className="404-box flex justify-center">
          <span className="text-main font-extrabold text-[150px]">404</span>
        </div>
        <div className="wrong-path-box flex justify-center pb-10">
          <span className="text-main text-lg">잘못된 경로입니다.</span>
        </div>
        <div className="btn-box flex justify-center text-xl">
          <Btn
            className="bg-main text-white px-10 py-4 rounded-[20px]"
            content={btnContent}
            onClick={userType === "patient" && toPatientDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default PC404;
