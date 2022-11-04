import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { requestLogin, requestUserInfo } from "api/login";

import Logo from "components/atoms/Logo";
import Btn from "components/atoms/Btn";

import ls from "helper/LocalStorage";

import "./Login.css";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, []);

  setInterval(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, 1000);

  function onChangeUsername(event) {
    const username = event.target.value;
    setUsername(username);
  }

  function onChangePassword(event) {
    const password = event.target.value;
    setPassword(password);
  }

  function getUserInfoSuccess(res) {
    // 병동로그인인지 환자로그인인지에 따라 navigate 분리
    console.log(res);
    navigate("/");
  }

  function getUserInfoFail(err) {
    console.log(err);
  }

  async function loginSuccess(res) {
    const accessToken = res.data.access_token;
    const refreshToken = res.data.refresh_token;
    ls.set("accessToken", accessToken);
    ls.set("refreshToken", refreshToken);
    navigate("/");
    // await requestUserInfo(getUserInfoSuccess, getUserInfoFail);
  }

  function loginFail(err) {
    console.log(err);
    alert("다시 한 번 작성해주세요");
  }

  async function onSubmitLogin(event) {
    event.preventDefault();
    // 유효성 검사
    await requestLogin(username, password, loginSuccess, loginFail);
    // await requestUserInfo(getUserInfoSuccess, getUserInfoFail);
  }

  return (
    <>
      {isPC && (
        <div className="bg-back h-[100vh] w-[100vw] flex justify-center items-center">
          <div className="login-frame shadow-login w-[60vw] h-[70vh] rounded-[20px] flex">
            <div className="bg-white rounded-l-[20px] w-1/2 h-full login-box flex flex-col items-center">
              <div className="login-frame h-full">
                <Logo size="s" logoClassName="h-[20%]" />
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
                    className="text-white bg-main shadow-loginbtn w-[18vw] text-sm h-9 rounded-full mt-5"
                    onClick=""
                    content="로그인"
                  />
                </form>
              </div>
              <span className="text-font2 text-xs text-center mt-auto mb-7">
                보호자는 모바일로 접속해주세요.
              </span>
            </div>
            <div className="tutorial bg-gradient-to-tr from-main to-blue rounded-r-[20px] w-1/2 h-full"></div>
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
                    onClick=""
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
