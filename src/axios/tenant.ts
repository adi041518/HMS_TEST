import axiosPrivate from "./axiosPrivate"

export const fetchAllTenants = () => {
    return axiosPrivate.get("/tenant/fetchAll")
}

export const Create=(payload:any,module:string)=>{
    return axiosPrivate.post(`/${module}/create`,payload)
}
export const Update=(payload:any,id:string,module:string)=>{
    return axiosPrivate.put(`/${module}/update/${id}`,payload)
}
export const Delete=(id:string,module:string)=>{
    return axiosPrivate.delete(`/${module}/delete/${id}`);
}