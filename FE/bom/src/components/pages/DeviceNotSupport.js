import { React, useState, useEffect } from "react";
import ls from "helper/LocalStorage";
import { useNavigate } from "react-router-dom";

import { UilLaptop, UilMobileAndroid } from "@iconscout/react-unicons";

import Logo from "components/atoms/Logo";

function DeviceNotSupport({ isPC }) {
  const navigate = useNavigate();

  const [isRow, setIsRow] = useState(false);

  useEffect(() => {
    checkUserType();
  }, [isPC]);

  const checkUserType = () => {
    const userType = ls.get("userType");
    if (userType === "ward" && isPC) {
      navigate("/");
    } else if (userType === "patient" && !isPC) {
      navigate(`/patient/${ls.get("number")}`);
    }
  };

  const goToLogin = () => {
    ls.clear();
    navigate("login");
  };

  useEffect(() => {
    if (window.innerHeight < 450) {
      setIsRow(true);
    } else {
      setIsRow(false);
    }
  }, []);

  return (
    <>
      {isPC && (
        <div className="device-not-support-pc h-[100vh] bg-back flex flex-col justify-center items-center">
          <div className="square-box bg-white h-4/5 w-4/5 flex flex-col justify-center">
            <div className="logo-box flex justify-center pb-20">
              <Logo disabled={true} size="xl" />
            </div>
            <div className="icon-box flex justify-center pb-10 text-main">
              <UilMobileAndroid size={60} />
            </div>
            <div className="content-box flex flex-col justify-center text-2xl text-font1">
              <span className="flex justify-center">보호자 및 환자에게</span>
              <span className="flex justify-center">
                지원하지 않는 디바이스입니다.
              </span>
              <br />
              <span className="flex justify-center">모바일 환경으로</span>
              <span className="flex justify-center">이용해주세요.</span>
            </div>
          </div>
        </div>
      )}
      {!isPC && (
        <div className="device-not-support-mobile h-[100vh] bg-back flex flex-col justify-center items-center">
          <div className="logo-box py-12">
            <Logo disabled={true} size="l" />
          </div>
          <div className="content-box w-[100vw] h-1/2 flex justify-center">
            <div className="square-box bg-white w-4/5 h-full rounded-[20px] shadow-box flex flex-col justify-center relative">
              <div
                className={`h-[90%] ${
                  isRow
                    ? "flex justify-center items-center"
                    : "flex flex-col justify-center"
                }`}
              >
                <div
                  className={`icon-box flex justify-center text-main ${
                    isRow ? "pr-10" : "pb-10"
                  }`}
                >
                  <UilLaptop size={isRow ? 80 : 100} />
                </div>
                <div className="message-box flex flex-col text-font1">
                  <span className={`${!isRow && "flex justify-center"}`}>
                    간호사에게 지원하지 않는
                  </span>
                  <span className={`${!isRow && "flex justify-center"}`}>
                    디바이스입니다.
                  </span>
                  <span className={`pt-3 ${!isRow && "flex justify-center"}`}>
                    더 넓은 화면의
                  </span>
                  <span className={`${!isRow && "flex justify-center"}`}>
                    디바이스를 이용해주세요.
                  </span>
                </div>
              </div>
              <span
                className="h-[10%] text-sm font-medium text-font2 flex justify-center hover:cursor-pointer hover:text-font2"
                onClick={goToLogin}
              >
                로그인 화면으로 이동
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeviceNotSupport;
