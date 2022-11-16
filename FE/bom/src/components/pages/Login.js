import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// api
import { requestLogin, requestUserInfo } from "api/account";

import ls from "helper/LocalStorage";

import Logo from "components/atoms/Logo";
import Btn from "components/atoms/Btn";
import LoginCarousel from "components/molecules/Login/LoginCarousel";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
    isLoggedIn();
  }, []);

  setInterval(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, 1000);

  function isLoggedIn() {
    if (ls.get("accessToken")) {
      ls.get("userType") === "ward"
        ? navigate("/")
        : navigate(`/patient/${ls.get("number")}`);
    }
  }

  function onChangeUsername(event) {
    const username = event.target.value;
    setUsername(username);
  }

  function onChangePassword(event) {
    const password = event.target.value;
    setPassword(password);
  }

  function getUserInfoSuccess(res) {
    const userType = res.data.userType;
    const number = res.data.number;
    ls.set("userType", userType);
    ls.set("number", number);
    if (userType === "ward") {
      navigate("/");
    } else {
      navigate(`/patient/${number}`);
    }
  }

  function getUserInfoFail() {}

  async function loginSuccess(res) {
    const accessToken = res.data.access_token;
    const refreshToken = res.data.refresh_token;
    ls.set("accessToken", accessToken);
    ls.set("refreshToken", refreshToken);
    await requestUserInfo(getUserInfoSuccess, getUserInfoFail);
  }

  function loginFail() {
    alert("다시 한 번 작성해주세요");
  }

  async function onSubmitLogin(event) {
    event.preventDefault();
    await requestLogin(username, password, loginSuccess, loginFail);
  }

  return (
    <>
      {isPC && (
        <div className="bg-back h-[100vh] w-[100vw] flex justify-center items-center">
          <div className="login-frame shadow-login w-[60vw] h-[70vh] rounded-[20px] flex">
            <div className="login-box bg-white rounded-l-[20px] w-1/2 h-full flex flex-col items-center">
              <div className="login-frame h-full">
                <Logo size="s" logoClassName="h-[25%]" />
                <h2 className="font-extrabold text-3xl text-main h-[15%]">
                  로그인
                </h2>
                <form action="POST" onSubmit={onSubmitLogin}>
                  <div className="user-box">
                    <input
                      type="text"
                      id="user_name"
                      autoComplete="off"
                      onChange={onChangeUsername}
                      required
                    />
                    <label htmlFor="user_name">
                      <span>병동 번호</span>
                    </label>
                  </div>
                  <div className="user-box">
                    <input
                      type="password"
                      id="password"
                      autoComplete="off"
                      onChange={onChangePassword}
                      required
                    />
                    <label htmlFor="password">
                      <span>비밀번호</span>
                    </label>
                  </div>
                  <Btn
                    className="text-white bg-main shadow-loginbtn w-[18vw] text-sm font-semibold h-10 rounded-full mt-10"
                    onClick={onSubmitLogin}
                    content="로그인"
                  />
                </form>
              </div>
              <span className="text-font2 text-xs text-center mt-auto mb-7">
                보호자는 모바일로 접속해주세요.
              </span>
            </div>
            <div className="tutorial bg-gradient-to-tr from-main to-blue rounded-r-[20px] w-1/2 h-full flex justify-center items-center">
              <LoginCarousel />
            </div>
          </div>
        </div>
      )}
      {!isPC && (
        <div className="bg-back h-[100vh] w-[100vw] flex justify-center items-center flex-col">
          <Logo size="l" logoClassName="h-[10%]" />
          <div className="bg-white rounded-l-[20px] M-login-box flex-col items-center login-frame shadow-login w-[70vw] h-[65vh] rounded-[20px] flex">
            <div className="login-frame h-full">
              <h2 className="font-extrabold text-3xl text-main h-[15%] text-center mt-10 mb-2">
                로그인
              </h2>
              <form action="POST" onSubmit={onSubmitLogin}>
                <div className="M-user-box">
                  <input
                    type="text"
                    id="user_name"
                    autoComplete="off"
                    onChange={onChangeUsername}
                    required
                  />
                  <label htmlFor="user_name">
                    <span>환자 번호</span>
                  </label>
                </div>
                <div className="M-user-box">
                  <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={onChangePassword}
                    required
                  />
                  <label htmlFor="password">
                    <span>비밀번호</span>
                  </label>
                </div>
                <div className="flex justify-center">
                  <Btn
                    className="text-white bg-main shadow-loginbtn w-[50vw] text-sm h-9 rounded-full mt-5"
                    onClick={onSubmitLogin}
                    content="로그인"
                  />
                </div>
              </form>
            </div>
            <span className="text-font2 text-sm text-center mt-auto mb-7">
              SSAFY 종합 병원
            </span>
          </div>
          <div className="h-[10vh]" />
        </div>
      )}
    </>
  );
}

export default Login;
