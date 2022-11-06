import Logo from "components/atoms/Logo";
import { React, useState, useEffect } from "react";

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
          <div className="logo-box">
            <Logo disabled={true} />
          </div>
          <div className="content-box">2</div>
        </div>
      )}
      {!isPC && (
        <div className="device-not-support-mobile h-[100vh] bg-back flex flex-col justify-center items-center">
          <div className="logo-box">
            <Logo disabled={true} size="s" />
          </div>
          <div className="content-box">2</div>
        </div>
      )}
    </>
  );
}

export default DeviceNotSupport;
