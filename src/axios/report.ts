import axiosPrivate from "./axiosPrivate"

export const fetchReportByID = (payload:any) => {
    return axiosPrivate.get(`report/fetch/${payload}`,)
}

// axios/report.ts
export const downloadReportFile = (fileName: string) => {
  return axiosPrivate.get(`/report/download/${fileName}`, {
    responseType: "blob",
  });
};