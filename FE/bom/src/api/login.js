import UserApi from "api/UserApi";

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

export { requestLogin, requestUserInfo };
