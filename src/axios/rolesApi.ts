import axiosPrivate from "./axiosPrivate"
export const rolesApi = (payload: any) => {
    return axiosPrivate.post("/role/create", payload)
}
export const fetchAllRolesApi = () => {
    return axiosPrivate.get("/role/fetchAll")
}

export const deleteRoleByIdApi = (roleCode: string) => {
    return axiosPrivate.delete(`/role/delete/${roleCode}`)
}

export const fetchRoleByIdApi = (roleCode: string) => {
    return axiosPrivate.get(`/role/fetch/${roleCode}`)
}
// export const editRoleByIdApi = (roleCode: string) => {
//     return axiosPrivate.post(`role/update/$(roleCode)`)
// }