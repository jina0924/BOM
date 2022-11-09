import UserApi from "api/UserApi";

function requestPatientDetail(patientNumber, success, fail) {
  patientNumber !== null
    ? UserApi.get(`wards/patients/${patientNumber}`).then(success).catch(fail)
    : UserApi.get("wards/patient").then(success).catch(fail);
}

function requestPatientDetailHealthInfo(patientNumber, params, success, fail) {
  patientNumber !== null
    ? UserApi.get(`wards/patients/${patientNumber}/health`, { params })
        .then(success)
        .catch(fail)
    : UserApi.get("wards/patient/health").then(success).catch(fail);
}

function requestPatientDetailDeviceInfo(patientNumber, params, success, fail) {
  UserApi.get(`batteries/${patientNumber}/bms`, { params })
    .then(success)
    .catch(fail);
}

export {
  requestPatientDetail,
  requestPatientDetailHealthInfo,
  requestPatientDetailDeviceInfo,
};
