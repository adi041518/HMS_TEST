import axiosPrivate from "./axiosPrivate"

export const fetchAllHospital = () => {
    return axiosPrivate.get("/hospital/fetchAll")
}
 