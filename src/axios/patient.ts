import axiosPrivate from "./axiosPrivate";
export const fetchAllPatients=()=>{
    return axiosPrivate.get("/patient/fetchAll")
}
export const createPatient=(payload:any)=>{
    return axiosPrivate.post("/patient/create",payload)
}
export const fetchPatientById=(patientId:string)=>{
    return axiosPrivate.get(`/patient/fetch/${patientId}`)
}
export const updatePatientById=(patientId:string,payload:any)=>{
    return axiosPrivate.patch(`/patient/update/${patientId}`,payload)
}
export const deletePatientById=(patientId:string)=>{
    return axiosPrivate.delete(`patient/delete/${patientId}`)
}
 