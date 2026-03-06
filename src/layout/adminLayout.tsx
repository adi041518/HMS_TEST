import { useEffect, useMemo, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuAdminbar, type AdminModuleType } from "../config/menubar";
import { Create, Delete, fetchAllTenants, Update } from "../axios/tenant";
import { fetchAllHospital } from "../axios/hospital";
import { fetchAllDoctors } from "../axios/doctors";
import { fetchAllNurse } from "../axios/nurse";
import { fetchAllPharmacist } from "../axios/pharmacist";
import { fetchAllReceptionist } from "../axios/receptionist";
import { fetchAllAppointments } from "../axios/appointment";
import { fetchAllMedicalRecords } from "../axios/medicalRecord";
import { hasAccess } from "../config/permission";
import { fetchRoleByIdApi } from "../axios/rolesApi";
import ModuleFormModal from "../components/FormModal";
import MedicalRecordModal from "../components/medicalRecordModal";
import { IoMdPersonAdd } from "react-icons/io";
import { showError, showSuccess } from "../Toast/toast";
import { fetchAllPatients } from "../axios/patient";

const Adminlayout = () => {
  const role = localStorage.getItem("roleName") || "SUPERADMIN";
  const menuBar = menuAdminbar[role] ?? [];

  const [selectedMenu, setSelectedMenu] = useState("");
  const [module, setModule] = useState<AdminModuleType>("tenant");
  const [rowData, setRowData] = useState<any[]>([]);
  const [roleDoc, setRoleDoc] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create");
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const permissions = useMemo(
    () => ({
      canView: hasAccess(roleDoc, module, "view"),
      canCreate: hasAccess(roleDoc, module, "create"),
      canUpdate: hasAccess(roleDoc, module, "update"),
      canDelete: hasAccess(roleDoc, module, "delete"),
    }),
    [roleDoc, module]
  );

  const apiMap: Record<AdminModuleType, () => Promise<any>> = {
    tenant: fetchAllTenants,
    hospital: fetchAllHospital,
    doctor: fetchAllDoctors,
    nurse: fetchAllNurse,
    pharmacist: fetchAllPharmacist,
    receptionist: fetchAllReceptionist,
    appointment: fetchAllAppointments,
    medicalRecord: fetchAllMedicalRecords,
    report:fetchAllPatients
  };

  const fetchData = async (mod: AdminModuleType) => {
    try {
      setLoading(true);
      const response = await apiMap[mod]();
      setRowData(response.data.data || []);
    } catch (error) {
      console.error("Fetch failed:", error);
      setRowData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const roleCode = localStorage.getItem("roleCode");
    if (!roleCode) return;

    fetchRoleByIdApi(roleCode).then((res) =>
      setRoleDoc(res.data.data)
    );
  }, []);

  useEffect(() => {
    if (menuBar.length > 0) {
      const first = menuBar[0];
      setSelectedMenu(first.title);
      setModule(first.module);
      fetchData(first.module);
    }
  }, [role]);

  const handleMenuClick = (title: string, mod: AdminModuleType) => {
    setSelectedMenu(title);
    setModule(mod);
    fetchData(mod);
  };

  return (
    <>
      <NavbarComponent />

      <Menubar
        menubar={menuBar}
        onClick={handleMenuClick}
        selectedMenu={selectedMenu}
      />

      {permissions.canCreate && (
        <div className="text-end m-3">
          <button
            className="btn btn-warning"
            onClick={() => {
              setFormMode("create");
              setSelectedRow(null);
              setShowForm(true);
            }}
          >
            <IoMdPersonAdd /> CREATE {module.toUpperCase()}
          </button>
        </div>
      )}

      <DynamicGrid
        rowData={rowData}
        type={module}
        loading={loading}
        onView={
          permissions.canView
            ? (row) => {
                setFormMode("view");
                setSelectedRow(row);
                setShowForm(true);
              }
            : undefined
        }
        onUpdate={
          permissions.canUpdate
            ? (row) => {
                setFormMode("edit");
                setSelectedRow(row);
                setShowForm(true);
              }
            : undefined
        }
        onDelete={
          permissions.canDelete
            ? async (row) => {
                if (!window.confirm("Delete this record?")) return;
                await Delete(row.code, module);
                showSuccess("Deleted successfully");
                fetchData(module);
              }
            : undefined
        }
      />

      {/* 🔥 Normal Modules */}
      {module !== "medicalRecord" && (
        <ModuleFormModal
          show={showForm}
          module={module}
          mode={formMode}
          initialData={selectedRow}
          onClose={() => setShowForm(false)}
          loading={formLoading}
          onSubmit={async (data) => {
            try {
              setFormLoading(true);

              if (formMode === "create") {
                await Create(data, module);
                showSuccess("Created successfully");
              } else if (formMode === "edit") {
                await Update(data, selectedRow.code, module);
                showSuccess("Updated successfully");
              }

              fetchData(module);
              setShowForm(false);
            } catch (err: any) {
              showError(
                err?.response?.data?.message || "Operation failed"
              );
            } finally {
              setFormLoading(false);
            }
          }}
        />
      )}

      {/* 🔥 Medical Record Module */}
      {module === "medicalRecord" && (
        <MedicalRecordModal
          show={showForm}
          mode={formMode}
          initialData={selectedRow}
          module={role}
          loading={formLoading}
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            try {
              setFormLoading(true);

              if (formMode === "create") {
                await Create(data, "medicalRecord");
                showSuccess("Medical Record Created");
              } else {
                await Update(data, selectedRow.code, "medicalRecord");
                showSuccess("Medical Record Updated");
              }

              fetchData("medicalRecord");
              setShowForm(false);
            } catch (err: any) {
              showError(
                err?.response?.data?.message || "Operation failed"
              );
            } finally {
              setFormLoading(false);
            }
          }}
        />
      )}
    </>
  );
};

export default Adminlayout;