import axiosPrivate from "./axiosPrivate"

export const fetchAllTests = () => {
    return axiosPrivate.get("/test/fetchAll")
}
 