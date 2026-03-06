import type { ICellRendererParams, ColDef } from "ag-grid-community";
import type { AdminModuleType, BillingModuleType, MastersModuleType } from "./menubar";
import { GrView } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type ActionHandler = (row: any) => void;

const actionColumn = (
  onView?: ActionHandler,
  onUpdate?: ActionHandler,
  onDelete?: ActionHandler
): ColDef => ({
  headerName: "Actions",
  field: "actions",
  width: 250,
  cellRenderer: (params: ICellRendererParams) => (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      {onView && (
        <span onClick={() => onView(params.data)} style={{ fontSize: "20px" }}>
          <GrView />
        </span>
      )}
      {onUpdate && (
        <span onClick={() => onUpdate(params.data)} style={{ fontSize: "20px" }}>
          <FaUserEdit />
        </span>
      )}
      {onDelete && (
        <span onClick={() => onDelete(params.data)} style={{ fontSize: "20px" }}>
          <MdDelete />
        </span>
      )}
    </div>
  ),
});

const baseColumns: ColDef[] = [
  {
    headerName: "S.No",
    valueGetter: (params) => params.node!.rowIndex! + 1,
    width: 90,
  },
];

export const columnAdminMap: Record<
  AdminModuleType,
  (onView?: ActionHandler, onUpdate?: ActionHandler, onDelete?: ActionHandler) => ColDef[]
> = {

  tenant: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Code", field: "code" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "PhoneNo", field: "phoneNo" },
    { headerName: "Dob", field: "dob" },
    { headerName: "CreatedBy", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  hospital: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Hospital Name", field: "name" },
    { headerName: "Hospital Code", field: "code" },
    { headerName: "Admin Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  doctor: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Doctor Name", field: "name" },
    { headerName: "Doctor Code", field: "code" },
    { headerName: "Doctor Email", field: "email" },
    { headerName: "Department", field: "department" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  nurse: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Nurse Name", field: "name" },
    { headerName: "Nurse Code", field: "code" },
    { headerName: "Nurse Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  pharmacist: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Pharmacist Name", field: "name" },
    { headerName: "Pharmacist Code", field: "code" },
    { headerName: "Pharmacist Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  receptionist: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Receptionist Name", field: "name" },
    { headerName: "Receptionist Code", field: "code" },
    { headerName: "Receptionist Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  appointment: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Appointment ID", field: "code" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Nurse ID", field: "nurseId" },
    { headerName: "Hospital ID", field: "hospitalId" },
    { headerName: "Medical ID", field: "medicalId" },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Reason", field: "reason" },
    { headerName: "Symptoms", field: "symptoms" },

    {
      headerName: "Processing Status",
      field: "isProcessing",
      cellRenderer: (params: ICellRendererParams) => {
        const processing = params.value;

        return (
          <span
            style={{
              backgroundColor: processing ? "#FFA500" : "#28A745",
              color: "white",
              padding: "4px 10px",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            {processing ? "Processing" : "Completed"}
          </span>
        );
      },
    },

    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  medicalRecord: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Record ID", field: "code" },
    { headerName: "Appointment ID", field: "appointmentId" },
    { headerName: "Patient ID", field: "patientId" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Nurse ID", field: "nurseId" },
    { headerName: "Hospital ID", field: "hospitalId" },
    { headerName: "Tenant ID", field: "tenantId" },

    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString(),
    },

    { headerName: "Created By", field: "createdBy" },

    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],

  report: (onView) => [
    ...baseColumns,
    { headerName: "Patient ID", field: "code" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Hospital ID", field: "hospitalId" },
    { headerName: "Tenant ID", field: "tenantId" },

    {
      headerName: "Action",
      field: "generate",
      cellRenderer: (params: ICellRendererParams) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onView && onView(params.data)}
        >
          Generate Report
        </button>
      ),
    },
  ],

};

export const columnMastersMap: Record<
  MastersModuleType,
  (
    onView?: ActionHandler,
    onUpdate?: ActionHandler,
    onDelete?: ActionHandler
  ) => ColDef[]
> = {

  users: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "User Code", field: "code" },
    { headerName: "User Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "DOB", field: "dob" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],

  test: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Test Code", field: "code" },
    { headerName: "Test Name", field: "testname" },
    { headerName: "Price", field: "price" },
    { headerName: "TenantID", field: "tenantId" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],

  medicines: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Medicine Code", field: "code" },
    { headerName: "Medicine Name", field: "name" },
    { headerName: "Dosage", field: "dosage" },
    { headerName: "Price Per Strip", field: "pricePerStrip" },
    { headerName: "Stock", field: "totalNoOfTablets" },
    { headerName: "Expiry Date", field: "expiryDate" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],

  appointments: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Appointment ID", field: "code" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],

  medicalRecord: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Record ID", field: "code" },
    { headerName: "Patient ID", field: "patientId" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],
};

export const columnBillingMap: Record<
  BillingModuleType,
  (onView?: ActionHandler, onUpdate?: ActionHandler, onDelete?: ActionHandler) => ColDef[]
> = {

  bill: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Bill Code", field: "code" },
    { headerName: "User Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "DOB", field: "dob" },
    { headerName: "Created By", field: "createdBy" },
    ...(onView || onUpdate || onDelete ? [actionColumn(onView, onUpdate, onDelete)] : []),
  ],
  report: () => [],

};

export const columnMap: Record<
  AdminModuleType | MastersModuleType | BillingModuleType,
  (onView?: ActionHandler, onUpdate?: ActionHandler, onDelete?: ActionHandler) => ColDef[]
> = {
  ...columnAdminMap,
  ...columnMastersMap,
  ...columnBillingMap,
};