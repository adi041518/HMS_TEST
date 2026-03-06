import axiosPrivate from "./axiosPrivate"

export const fetchAllReceptionist = () => {
    return axiosPrivate.get("/receptionist/fetchAll")
}
export const CreatePrescription = (
  medicalRecordId: string,
  data: any
) => {
  return axiosPrivate.post(
    `/prescription/create/${medicalRecordId}`,
    data
  );
};
export const UpdatePrescription = (data:any) => {
    return axiosPrivate.put("/prescription/edit",data)
}