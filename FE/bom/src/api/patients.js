import UserApi from "api/UserApi";

function requestPatientList(page, limit, success, fail) {
  UserApi.get(`wards/patients?page=${page}&limit=${limit}`)
    .then(success)
    .catch(fail);
}

function requestSearchPatient(page, limit, keyword, success, fail) {
  UserApi.get(`wards/patients?page=${page}&limit=${limit}&patient=${keyword}`)
    .then(success)
    .catch(fail);
}

export { requestPatientList, requestSearchPatient };
