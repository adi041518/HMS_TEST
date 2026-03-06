import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import type { AdminModuleType, BillingModuleType, MastersModuleType } from "../config/menubar";
import { columnMap } from "../config/tablelist";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  rowData: any[];
  type: AdminModuleType | MastersModuleType|BillingModuleType;
  loading?: boolean;
  onView?: (row: any) => void;
  onUpdate?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const DynamicGrid: React.FC<Props> = ({
  rowData,
  type,
  loading = false,
  onView,
  onUpdate,
  onDelete,
}) => {

  const columnDefs = useMemo<ColDef[]>(() => {
    const columnGenerator = columnMap[type];
    if (!columnGenerator) return [];
    return columnGenerator(onView, onUpdate, onDelete);
  }, [type, onView, onUpdate, onDelete]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: false,
    filter: false,
    resizable: true,
    flex: 2,
    editable: false,
    headerClass:"center-header",
    cellStyle: {
    display: "flex",
    alignItems: "center",     // vertical center
    // justifyContent: "center", // horizontal center
  },
  }), []);
  const pageSize=10;
  const rowHeight=65;
  const headerHeight=65;
  const gridHeight=pageSize* rowHeight+headerHeight;


  return (
    <div
      className="ag-theme-quartz custom-grid"
      style={{ height: gridHeight, width: "100%", marginTop: "20px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={pageSize}
        rowHeight={65}
        headerHeight={65}
        animateRows
        loading={loading}
        getRowId={(params) => params.data.code}
      />
    </div>
  );
};

export default DynamicGrid;