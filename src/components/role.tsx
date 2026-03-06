import { useEffect, useState } from "react";
import RoleGrid from "../components/roleGrid";
import { fetchAllRolesApi, deleteRoleByIdApi } from "../axios/rolesApi";
import NavbarComponent from "../components/navbar";
import Menubar from "../components/menubar";
import { menuRolesbar, type ModuleType } from "../config/menubar";
import { Modal, Button } from "react-bootstrap";
import CreateRole from "./createRole";

const Role = () => {
    const roleName = localStorage.getItem("roleName") || "SUPERADMIN";
    const menuBar = menuRolesbar[roleName] ?? [];

    const [selectedMenu, setSelectedMenu] = useState("");
    const [module, setModule] = useState<ModuleType>("role");
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    // 🔥 Fetch Roles
    const fetchRoles = async () => {
        try {
            setLoading(true);
            const res = await fetchAllRolesApi();
            setRoles(res.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Initial Load
    useEffect(() => {
        if (menuBar.length > 0) {
            const first = menuBar[0];
            setSelectedMenu(first.title);
            setModule(first.module);
            fetchRoles();
        }
    }, [roleName]);

    // 🔥 Menu Click Handler
    const handleMenuClick = (title: string, mod: ModuleType) => {
        setSelectedMenu(title);
        setModule(mod);

        // If later you add more modules under Role,
        // you can switch here based on mod
        fetchRoles();
    };

    const handleDelete = async (row: any) => {
        try {
            const res = await deleteRoleByIdApi(row.roleCode);
            if (res.status === 200) {
                setRoles(prev =>
                    prev.filter(r => r.roleCode !== row.roleCode)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <NavbarComponent />

            {/* 🔥 MENUBAR */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "60px",
                    backgroundColor: "#f8f9fa",
                }}
            >
                <Menubar
                    menubar={menuBar}
                    onClick={handleMenuClick}
                    selectedMenu={selectedMenu}
                />
            </div>

            {/* 🔥 CREATE BUTTON (Right Side) */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                    marginRight: "15px",
                }}
            >
                <button
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                >
                    + CREATE {module.toUpperCase()}
                </button>
            </div>

            {/* 🔥 GRID */}
            <div className="container-fluid">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <RoleGrid
                        rowData={roles}
                        onView={() => { }}
                        onUpdate={() => { }}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* 🔥 MODAL */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create {module.toUpperCase()}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CreateRole
                        onSuccess={() => {
                            setShowModal(false);
                            fetchRoles();
                        }}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Role;
