import React from "react";

import Logo from "components/atoms/Logo";
import Btn from "components/atoms/Btn";

import "./Login.css";

function Login() {
  return (
    <div className="bg-back h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="login-frame shadow-login w-[60vw] h-[70vh] rounded-[20px] flex">
        <div className="bg-white rounded-l-[20px] w-1/2 h-full login-box flex flex-col items-center">
          <div className="abc">
            <Logo size="s" />
            <h2 className="font-extrabold text-3xl text-main pt-5 pb-8">
              로그인
            </h2>
            <form action="POST">
              <div className="user-box">
                <input type="text" id="user_name" autocomplete="off" required />
                <label for="user_name">
                  <span>병동 번호</span>
                </label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  id="password"
                  autocomplete="off"
                  required
                />
                <label for="password">
                  <span>비밀번호</span>
                </label>
              </div>
              <Btn
                className="text-white bg-main shadow-loginbtn w-[15vw] text-sm h-9 rounded-full mt-5"
                onClick=""
                content="로그인"
              />
            </form>
          </div>
        </div>
        <div className="tutorial bg-gradient-to-tr from-main to-blue rounded-r-[20px] w-1/2 h-full"></div>
      </div>
    </div>
  );
}

export default Login;
