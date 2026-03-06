import axiosPublic from "./axiosPublic.ts";
import axiosPrivate from "./axiosPrivate.ts";
export const loginApi = (data: any) => {
    return axiosPublic.post("/login", data);
};
 
export const resetPasswordApi = (payload: any) => {
    return axiosPrivate.post("/reset-password", payload);
};
 
export const forgotPasswordApi = (payload: any) => {
    return axiosPublic.post("/forgot-password", payload)
}