import axiosPrivate from "./axiosPrivate"

export const fetchAllMedicalRecords = () => {
    return axiosPrivate.get("/medicalRecord/fetchAll")
}
 