import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoleByIdApi } from "../axios/rolesApi";
import type { Privilege } from "../types/role";
import { ACCESS } from "../constants/modules";
import { useNavigate } from "react-router-dom";

const ViewRoles = () => {
    const { roleCode } = useParams<{ roleCode: string }>();

    const [roleName, setRoleName] = useState("");
    const [privileges, setPrivileges] = useState<Privilege[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!roleCode) return;

        const fetchRole = async () => {
            try {
                setLoading(true);

                const response = await fetchRoleByIdApi(roleCode);
                console.log("API Response:", response.data);

                const data = response.data.data;

                setRoleName(data.roleName);
                setPrivileges(data.privileges);

            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [roleCode]);


    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="role-container">
                <h2>View Role</h2>

                {/* Role Name */}
                <div className="form-group">
                    <label>Role Name</label>
                    <input
                        type="text"
                        value={roleName}
                        disabled
                    />
                </div>

                {/* Privileges */}
                {privileges.map((privilege, index) => (
                    <div className="role-card" key={index}>
                        <div className="card-module">
                            <strong>{privilege.module}</strong>
                        </div>

                        <div className="card-access">
                            {ACCESS.map(access => (
                                <label key={access} style={{ marginRight: "10px" }}>
                                    <input
                                        type="checkbox"
                                        checked={privilege.access.includes(access)}
                                        disabled
                                    />
                                    {access}
                                </label>
                            ))}
                        </div>

                    </div>
                ))}

            </div>
            <button className="close-btn"
                onClick={() => { navigate("/roles") }}
            >
                Close
            </button>
        </>
    );
};

export default ViewRoles;
