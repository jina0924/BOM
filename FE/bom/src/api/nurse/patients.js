import NurseApi from "../NurseApi";

function requestPatientList(patientNumber, success, fail) {
  NurseApi.get(`wards/patients/${patientNumber}`).then(success).catch(fail);
}

export { requestPatientList };
