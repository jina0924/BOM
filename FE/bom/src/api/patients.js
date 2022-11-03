import NurseApi from "./UserApi";

function requestPatientList(patientNumber, success, fail) {
  NurseApi.get(`wards/patients/${patientNumber}`).then(success).catch(fail);
}

export { requestPatientList };
