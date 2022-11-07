import { React, useState, useEffect } from "react";

import { UilLaptop, UilMobileAndroid } from "@iconscout/react-unicons";

import Logo from "components/atoms/Logo";

function DeviceNotSupport() {
  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, []);

  setInterval(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, 1000);

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
            <div className="square-box bg-white w-4/5 h-full rounded-[20px] shadow-box flex flex-col justify-center">
              <div className="icon-box flex justify-center text-main pb-10">
                <UilLaptop size={100} />
              </div>
              <div className="message-box flex flex-col text-font1">
                <span className="flex justify-center">
                  간호사에게 지원하지 않는
                </span>
                <span className="flex justify-center">디바이스입니다.</span>
                <br />
                <span className="flex justify-center">더 넓은 화면의</span>
                <span className="flex justify-center">
                  디바이스를 이용해주세요.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeviceNotSupport;
