import axiosPrivate from "./axiosPrivate"

export const fetchAllNurse = () => {
    return axiosPrivate.get("/nurse/fetchAll")
}
 