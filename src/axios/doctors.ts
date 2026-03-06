import axiosPrivate from "./axiosPrivate";
export const fetchAllDoctors = () => {
    return axiosPrivate.get("/doctor/fetchAll")
}