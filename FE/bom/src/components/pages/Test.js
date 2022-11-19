import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { requestLogin } from "api/nurse";

import Logo from "components/atoms/Logo";
import Btn from "components/atoms/Btn";

import "./MobileLogin.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onChangeUsername(event) {
        const username = event.target.value;
        setUsername(username);
    }

    function onChangePassword(event) {
        const password = event.target.value;
        setPassword(password);
    }

    function loginSuccess(res) {
        // const accessToken = res.data.access_token;
        // const refreshToken = res.data.refresh_token;
        // const user = res.data.user;
        navigate("/main");
    }

    function loginFail(err) {
        console.log(err);
        alert("다시 한 번 작성해주세요");
    }

    function onSubmitLogin(event) {
        event.preventDefault();
        // 유효성 검사
        requestLogin(username, password, loginSuccess, loginFail);
    }

    return (
        <div className="bg-back h-[100vh] w-[100vw] flex justify-center items-center flex-col">
            <Logo size="s" logoClassName="h-[20%]" />
            <div className="bg-white rounded-l-[20px] M-login-box flex-col items-center login-frame shadow-login w-[60vw] h-[70vh] rounded-[20px] flex">
                <div className="login-frame h-full">
                    <h2 className="font-extrabold text-3xl text-main h-[15%] text-center mt-10">로그인</h2>
                    <form action="POST" onSubmit={onSubmitLogin}>
                        <div className="M-user-box">
                            <input type="text" id="user_name" autoComplete="off" onChange={onChangeUsername} required />
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
                                className="text-white bg-main shadow-loginbtn w-[30vw] text-sm h-9 rounded-full mt-5"
                                onClick=""
                                content="로그인"
                            />
                        </div>
                    </form>
                </div>
                <span className="text-font2 text-xs text-center mt-auto mb-7">병워어어언!!!</span>
            </div>
        </div>
    );
}

export default Login;
