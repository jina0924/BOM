import UserApi from "api/UserApi";
import { success } from "daisyui/src/colors";

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

function requestExcelDownload(params, success, fail) {
  UserApi.get("wards/patients/excel", { responseType: "blob", params })
    .then(success)
    .catch(fail);
}

export {
  requestPatientDetail,
  requestPatientDetailHealthInfo,
  requestPatientDetailDeviceInfo,
  requestExcelDownload,
};
