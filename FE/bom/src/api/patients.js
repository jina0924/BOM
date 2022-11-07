import UserApi from "api/UserApi";

function requestPatientList(page, limit, success, fail) {
  UserApi.get(`wards/patients?page=${page}&limit=${limit}`)
    .then(success)
    .catch(fail);
}

export { requestPatientList };
