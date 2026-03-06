import { useState, useRef, useEffect } from "react";
import type { Module, Access, Privilege } from "../types/role";
import { MODULES, ACCESS } from "../constants/modules";
import "./createRole.css";
import { rolesApi } from "../axios/rolesApi";type Props = {
    onSuccess: () => void;
};

const CreateRole = ({ onSuccess }: Props) => {
    const [roleName, setRoleName] = useState("");
    const [selectedModule, setSelectedModule] = useState<Module | "">("");
    const [selectedAccess, setSelectedAccess] = useState<Access[]>([]);
    const [privileges, setPrivileges] = useState<Privilege[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleAccess = (access: Access) => {
        if (selectedAccess.includes(access)) {
            setSelectedAccess(selectedAccess.filter(a => a !== access));
        } else {
            setSelectedAccess([...selectedAccess, access]);
        }
    };

    const handleSelectAll = () => {
        if (selectedAccess.length === ACCESS.length) {
            setSelectedAccess([]);
        } else {
            setSelectedAccess(ACCESS);
        }
    };

    const handleAdd = () => {
        if (!selectedModule || selectedAccess.length === 0) return;

        const newPrivilege: Privilege = {
            module: selectedModule,
            access: selectedAccess
        };

        if (editIndex !== null) {
            const updated = [...privileges];
            updated[editIndex] = newPrivilege;
            setPrivileges(updated);
            setEditIndex(null);
        } else {
            const exists = privileges.some(
                p => p.module === selectedModule
            );
            if (exists) {
                alert("Module already added");
                return;
            }
            setPrivileges([...privileges, newPrivilege]);
        }

        setSelectedModule("");
        setSelectedAccess([]);
    };

    const handleEdit = (index: number) => {
        const privilege = privileges[index];
        setSelectedModule(privilege.module);
        setSelectedAccess(privilege.access);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        setPrivileges(privileges.filter((_, i) => i !== index));
    };

    const addRole = async () => {
        if (!roleName || privileges.length === 0) {
            alert("Please fill role name and privileges");
            return;
        }

        const payload = {
            roleName,
            privileges
        };

        try {
            const response=await rolesApi(payload);  // 🔥 API CALL
            console.log("Response: ",response.data)

            alert("Role created successfully");

            onSuccess();      // 🔥 Navigate AFTER success
        } catch (error) {
            console.error(error);
            alert("Error creating role");
        }
    };

    return (
        <div className="role-container">
            <h2>Create Role</h2>

            {/* Role Name */}
            <div className="form-group">
                <label>Role Name</label>
                <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
            </div>

            {/* Added Cards */}
            {privileges.map((privilege, index) => (
                <div className="role-card" key={index}>
                    <div className="card-module">
                        <strong>{privilege.module}</strong>
                    </div>

                    <div className="card-access">
                        {privilege.access.map(a => (
                            <span key={a} className="access-badge">
                                {a}
                            </span>
                        ))}
                    </div>

                    <div className="card-actions">
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                </div>
            ))}

            {/* Module */}
            <div className="form-group">
                <label>Module</label>
                <select
                    value={selectedModule}
                    onChange={(e) =>
                        setSelectedModule(e.target.value as Module)
                    }
                >
                    <option value="">Select Module</option>
                    {MODULES.map(module => (
                        <option key={module} value={module}>
                            {module}
                        </option>
                    ))}
                </select>
            </div>

            {/* Access Dropdown */}
            <div className="form-group " ref={dropdownRef}>
                <label>Access</label>

                <div
                    className="dropdown-header p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedAccess.length > 0
                        ? selectedAccess.join(", ")
                        : "Select Access"}
                </div>

                {isOpen && (
                    <div className="dropdown-content ">
                        {ACCESS.map(access => (
                            <label key={access}>
                                <input
                                    type="checkbox"
                                    checked={selectedAccess.includes(access)}
                                    onChange={() => toggleAccess(access)}
                                />
                                {access}
                            </label>
                        ))}

                        <hr />

                        <label>
                            <input
                                type="checkbox"
                                checked={selectedAccess.length === ACCESS.length}
                                onChange={handleSelectAll}
                            />
                            Select All
                        </label>
                    </div>
                )}
            </div>

            {/* Add Button */}
            <div className="add-btn-container">
                <button onClick={handleAdd}>
                    {editIndex !== null ? "Update" : "Add"}
                </button>
            </div>
            <div className="add-role">
                <button onClick={addRole}>
                    Add role
                </button>
            </div>
        </div>
    );
};

export default CreateRole;
