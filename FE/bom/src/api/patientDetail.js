import UserApi from "api/UserApi";

function requestPatientDetail(patientNumber, success, fail) {
  patientNumber !== null
    ? UserApi.get(`wards/patients/${patientNumber}`).then(success).catch(fail)
    : UserApi.get("wards/patient").then(success).catch(fail);
}

export { requestPatientDetail };
