import UserApi from "api/UserApi";
import axios from "axios";

function requestLogin(username, password, success, fail) {
  UserApi.post("accounts/user/login/", {
    username: username,
    password: password,
  })
    .then(success)
    .catch(fail);
}

// function requestLogout()

function requestUserInfo(success, fail) {
  UserApi.get("accounts/user/").then(success).catch(fail);
}

function requestAccessToken(success, fail) {
  axios
    .post("https://thundervolt.co.kr/api/accounts/user/token/refresh/", {
      headers: {
        Authorization: localStorage.getItem("refreshToken"),
      },
    })
    .then(success)
    .catch(fail);
}

export { requestLogin, requestUserInfo, requestAccessToken };
