import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Role from "./components/role";
// import CreateRole from "./components/createRole";
import ViewRoles from "./components/viewRoles";
import DashboardHome from "./layout/dashboardlayout";
import Adminlayout from "./layout/adminLayout";
import Masterlayout from "./layout/masterLayout";
import { ToastContainer } from "react-toastify";
import Landing from "./layout/landingpage";
import BillingLayout from "./layout/billingLayout";
const Loginpage = lazy(() => import("./pages/login"));
const ForgotPage = lazy(() => import("./pages/forgot"));
const ResetPage = lazy(() => import("./pages/reset"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      }
    >
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path='/dashboard' element={<DashboardHome />} />
        <Route path='/dashboard/admin' element={<Adminlayout />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/dashboard/roles" element={<Role />} />
        {/* <Route path="/roles/create" element={<CreateRole/>}/> */}
        <Route path="/roles/view/:roleCode" element={<ViewRoles />} />
        <Route path="/dashboard/masters" element={<Masterlayout />} />
        <Route path="/dashboard/billing" element={<BillingLayout />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </Suspense>
  );
}

export default App;
