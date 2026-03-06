import axiosPrivate from "./axiosPrivate"

export const fetchAllAppointments = () => {
    return axiosPrivate.get("/appointment/fetchAll")
}
 