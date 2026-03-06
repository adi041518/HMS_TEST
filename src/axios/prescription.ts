import axiosPrivate from "./axiosPrivate"

export const fetchPrescriptionById=(prescriptionId:string)=>{
    return axiosPrivate.get(`/prescription/fetch/${prescriptionId}`)
}
 