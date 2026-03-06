import type { ColDef, ICellRendererParams } from "ag-grid-community";

export interface RoleRow {
  roleCode: string;
  roleName: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
}

export const getRoleColumns = (
  onView?: (row: RoleRow) => void,
  onUpdate?: (row: RoleRow) => void,
  onDelete?: (row: RoleRow) => void
): ColDef<RoleRow>[] => [
  {
    headerName: "S.No",
    valueGetter: "node.rowIndex + 1",
    width: 90,
  },
  {
    headerName: "Role ID",
    field: "roleCode",
  },
  {
    headerName: "Role Name",
    field: "roleName",
  },
  {
    headerName: "Created By",
    field: "CreatedBy",
  },
  {
    headerName: "Created At",
    field: "CreatedAt",
  },
  {
    headerName: "Updated By",
    field: "UpdatedBy",
  },
  {
    headerName: "Updated At",
    field: "UpdatedAt",
  },
  {
    headerName: "Actions",
    width: 250,
    cellRenderer: (params: ICellRendererParams<RoleRow>) => {
      if (!params.data) return null;

      return (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-info"
            onClick={() => onView?.(params.data!)}
          >
            View
          </button>

          <button
            className="btn btn-sm btn-warning"
            onClick={() => onUpdate?.(params.data!)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete?.(params.data!)}
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
