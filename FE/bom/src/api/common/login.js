import NurseApi from "../NurseApi";

function requestLogin(username, password, success, fail) {
  NurseApi.post("accounts/user/login/", {
    username: username,
    password: password,
  })
    .then(success)
    .catch(fail);
}

// function requestLogout()

export { requestLogin };
