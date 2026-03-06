import { dashboardCards } from "../config/dashboard";
import NavbarComponent from "../components/navbar";
import Cards from "../components/card";
import bgVideo from '../assets/medicalbackgirundherovideo.mp4'; // add your video
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllRolesApi } from "../axios/rolesApi";
import { setRoles } from "../store/slices/RoleSlice";
import { useEffect } from "react";

const DashboardHome = () => {
const storedRole = localStorage.getItem("roleName");
type Role = "SUPERADMIN" | "TENANT" | "HOSPITAL"|"DOCTOR"|"NURSE"|"PHARMACIST";
const role: Role =
  storedRole === "SUPERADMIN" ||
  storedRole === "TENANT" ||
  storedRole === "HOSPITAL"||
  storedRole==="DOCTOR"||
  storedRole==="NURSE"||
  storedRole==="PHARMACIST"
    ? storedRole
    : "SUPERADMIN";

const cards = dashboardCards[role];
const dispatch = useDispatch();

const loadRoles = async () => {
  try {
    const res = await fetchAllRolesApi();

    const roleDocs = res.data.data;

    // Extract only roleCode & roleName
    const cleanedRoles = roleDocs.map((role: any) => ({
      roleCode: role.roleCode,
      roleName: role.roleName,
    }));

    dispatch(setRoles(cleanedRoles));

  } catch (err) {
    console.error("Failed to fetch roles", err);
  }
};


useEffect(() => {
  loadRoles();
}, []);
    return (
        <div className="video-wrapper">

            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="background-video"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="video-overlay"></div>

            {/* Navbar */}
            <NavbarComponent />

            {/* Dashboard Content */}
            <div className="dashboard-content">
                {cards.map((card, index) => (
                    <Cards key={index} card={card} />
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default DashboardHome;
