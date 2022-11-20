import UserApi from "api/UserApi";

function requestNurseList(params, success, fail) {
  UserApi.get("wards/nurse", { params }).then(success).catch(fail);
}

export { requestNurseList };
