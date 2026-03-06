import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeMaterial,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { getRoleColumns } from "../config/roleColumn";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  rowData: any[];
  onView?: (row: any) => void;
  onUpdate?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const RoleGrid: React.FC<Props> = ({
  rowData,
  onView,
  onUpdate,
  onDelete,
}) => {
  const columnDefs = useMemo(() => {
    return getRoleColumns(onView, onUpdate, onDelete);
  }, [onView, onUpdate, onDelete]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      editable: false,
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz custom-grid"
      style={{ height: 800, width: "100%", marginTop: "20px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        theme={themeMaterial}
        rowHeight={65}
        headerHeight={65}
      />
    </div>
  );
};

export default RoleGrid;
