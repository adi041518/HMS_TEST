import axiosPrivate from "./axiosPrivate"

export const CreateTestReport = (payload:any) => {
    return axiosPrivate.post(`/testReport/create/${payload.patientId}`);
}
export const fetchTestReportByPatientId = (reportId:string) => {
    return axiosPrivate.get(`/testReport/fetch/${reportId}`)
}
 