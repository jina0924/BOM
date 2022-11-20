import UserApi from "api/UserApi";

function requestWardInfo(success, fail) {
  UserApi.get("wards/ward").then(success).catch(fail);
}

export { requestWardInfo };
