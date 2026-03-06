import axiosPrivate from "./axiosPrivate"

export const fetchAllPharmacist = () => {
    return axiosPrivate.get("/pharmacist/fetchAll")
}
 