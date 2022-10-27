import React from "react";

function Login() {
  return (
    <div className="bg-back h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="login-frame shadow-login w-[60vw] h-[70vh] rounded-[20px] flex">
        <div className="login-form bg-white rounded-l-[20px] w-1/2 h-full">
          <span>로그인</span>
          <form action="POST">
            <input type="text" />
            <input type="text" />
          </form>
        </div>
        <div className="tutorial bg-gradient-to-tr from-main to-blue rounded-r-[20px] w-1/2 h-full"></div>
      </div>
    </div>
  );
}

export default Login;
