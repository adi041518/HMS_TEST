import { useEffect, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuBillingbar } from "../config/menubar";
import { fetchAllPatients } from "../axios/patient";
import ReportModal from "../components/reportmodal";

const BillingLayout = () => {
  const role = localStorage.getItem("roleName") || "SUPERADMIN";
  const menuBar = menuBillingbar[role] ?? [];

  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetchAllPatients();
      setRowData(response.data.data || []);
    } catch (error) {
      console.error("Fetch failed:", error);
      setRowData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <NavbarComponent />

      <Menubar
        menubar={menuBar}
        onClick={() => {}}
        selectedMenu="Reports"
      />

      <DynamicGrid
        rowData={rowData}
        type="report"
        loading={loading}
        onView={(row) => {
          setSelectedRow(row);
          setShowReport(true);
        }}
      />

      {/* REPORT MODAL */}
      {showReport && (
        <ReportModal
          show={showReport}
          patientData={selectedRow}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
};

export default BillingLayout;