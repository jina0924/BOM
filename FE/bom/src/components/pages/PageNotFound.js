import Mobile404 from "components/molecules/404/Mobile404";
import PC404 from "components/molecules/404/PC404";
import ls from "helper/LocalStorage";
import { useEffect } from "react";
import { useState } from "react";
import { React } from "react";

function PageNotFound({ isPC }) {
  const [userType, setUserType] = useState();

  useEffect(() => {
    setUserType(ls.get("userType"));
  }, []);

  return (
    <>
      {userType && (
        <>
          {isPC && <PC404 userType={userType} />}
          {!isPC && <Mobile404 userType={userType} />}
        </>
      )}
      {!userType && (
        <>
          {isPC && <PC404 />}
          {!isPC && <Mobile404 />}
        </>
      )}
    </>
  );
}

export default PageNotFound;
