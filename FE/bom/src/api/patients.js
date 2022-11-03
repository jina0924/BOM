import UserApi from "api/UserApi";

function requestPatientList(patientNumber, success, fail) {
  UserApi.get(`wards/patients/${patientNumber}`).then(success).catch(fail);
}

export { requestPatientList };
