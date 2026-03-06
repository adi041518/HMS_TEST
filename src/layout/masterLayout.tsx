import { useEffect, useMemo, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuMastersbar, type MastersModuleType } from "../config/menubar";
import { Create, Update, Delete, fetchAllTenants } from "../axios/tenant";
import { hasAccess } from "../config/permission";
import { fetchRoleByIdApi } from "../axios/rolesApi";
import ModuleFormModal from "../components/FormModal";
import TestModal from "../components/TestModal";
import MedicalRecordModal from "../components/medicalRecordModal";
import { fetchAllTests } from "../axios/tests";
import { fetchAllMedicines } from "../axios/medicines";
import { fetchAllAppointments } from "../axios/appointment";
import { fetchAllMedicalRecords } from "../axios/medicalRecord";
import { showError, showSuccess } from "../Toast/toast";

const Masterlayout = () => {
  const role = localStorage.getItem("roleName") || "SUPERADMIN";
  const menuBar = menuMastersbar[role] ?? [];

  const [selectedMenu, setSelectedMenu] = useState("");
  const [module, setModule] = useState<MastersModuleType>("users");
  const [rowData, setRowData] = useState<any[]>([]);
  const [roleDoc, setRoleDoc] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] =
    useState<"create" | "edit" | "view">("create");
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

  const apiMap: Record<MastersModuleType, () => Promise<any>> = {
    users: fetchAllTenants,
    test: fetchAllTests,
    medicines: fetchAllMedicines,
    appointments: fetchAllAppointments,
    medicalRecord: fetchAllMedicalRecords,
  };

  const fetchData = async (mod: MastersModuleType) => {
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
  }, [menuBar]);

  const handleMenuClick = (title: string, mod: MastersModuleType) => {
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
            className="btn btn-success"
            onClick={() => {
              setFormMode("create");
              setSelectedRow(null);
              setShowForm(true);
            }}
          >
            + CREATE {module.toUpperCase()}
          </button>
        </div>
      )}

      {/* GRID */}
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

                try {
                  await Delete(row.code, module);
                  showSuccess("Deleted successfully");
                  fetchData(module);
                } catch (err: any) {
                  showError(
                    err?.response?.data?.message || "Delete failed"
                  );
                }
              }
            : undefined
        }
      />

      {module === "test" && (
        <TestModal
          show={showForm}
          mode={formMode}
          initialData={selectedRow}
          loading={formLoading}
          onClose={() => setShowForm(false)}
          onSubmit={async (data: any) => {
            try {
              setFormLoading(true);

              if (formMode === "create") {
                await Create(data, "test");
                showSuccess("Test Created");
              } else if (formMode === "edit") {
                await Update(data, selectedRow.code, "test");
                showSuccess("Test Updated");
              }

              fetchData("test");
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

      {module === "medicalRecord" && (
        <MedicalRecordModal
          show={showForm}
          mode={formMode}
          initialData={selectedRow}
          loading={formLoading}
          onClose={() => setShowForm(false)}
          onSubmit={async (data: any) => {
            try {
              setFormLoading(true);

              if (formMode === "create") {
                await Create(data, "medicalRecord");
                showSuccess("Medical Record Created");
              } else if (formMode === "edit") {
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

      {module !== "test" && module !== "medicalRecord" && (
        <ModuleFormModal
          show={showForm}
          module={module}
          mode={formMode}
          initialData={selectedRow}
          loading={formLoading}
          onClose={() => setShowForm(false)}
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
    </>
  );
};

export default Masterlayout;