import UserApi from "api/UserApi";

function requestDoctorList(params, success, fail) {
  UserApi.get("wards/doctor", { params }).then(success).catch(fail);
}

export { requestDoctorList };
