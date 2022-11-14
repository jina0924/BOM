import UserApi from "api/UserApi";
// import axios from "axios";

// 만료 시간
// const JWT_EXPIRY_TIME = 12 * 3600 * 1000;

function requestLogin(username, password, success, fail) {
  UserApi.post("accounts/user/login/", {
    username: username,
    password: password,
  })
    .then(success)
    .catch(fail);
}

// function loginSuccess(res) {
//   const accessToken = res.data.access_token;
//   axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   // const refreshToken = res.data.refresh_token;
//   setTimeout(requestSilentRefresh, JWT_EXPIRY_TIME - 60000);
// }

// function loginFail(err) {
//   console.log(err);
//   alert("다시 한 번 작성해주세요.");
// }

// function requestLogout()

function requestUserInfo(success, fail) {
  UserApi.get("accounts/user/usertype").then(success).catch(fail);
}

// function requestSilentRefresh() {
//   axios
//     .post("accounts/user/token/refresh/")
//     .then(loginSuccess)
//     .catch((err) => console.log(err));
// }

// export { requestLogin, requestUserInfo, loginSuccess, loginFail };

function requestLogout(success, fail) {
  UserApi.post("accounts/user/logout/").then(success).catch(fail);
}
export { requestLogin, requestUserInfo, requestLogout };
