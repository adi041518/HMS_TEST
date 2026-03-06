import { RiGroupLine } from "react-icons/ri";
import type { IconType } from "react-icons";
import { FaHospital,  FaUsers } from "react-icons/fa";
import { GiTestTubes } from "react-icons/gi";
import { SiGooglesheets } from "react-icons/si";
import { PiUsersThreeBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNurseFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { AiFillMedicineBox } from "react-icons/ai";
export type AdminModuleType =
  | "tenant"
  | "hospital"
  | "doctor"
  | "nurse"
  | "pharmacist"
  | "receptionist"
  | "appointment"
  | "medicalRecord"
  |"pharmacist"
  |"report";
  
 export type MastersModuleType=
  | "users"
  | "test"
  | "medicines"
  | "appointments"
  |"medicalRecord";
export type BillingModuleType=
|"report"
|"bill"

export const menuAdminbar: Record<string, MenuItem<AdminModuleType>[]> = {
  SUPERADMIN: [
    { title: "Tenants", module: "tenant",icon:RiGroupLine },
    { title: "Hospitals", module: "hospital",icon:FaHospital }
  ],
  TENANT: [
    { title: "Hospitals", module: "hospital",icon:FaHospital }
  ],
  HOSPITAL: [
    { title: "Doctor", module: "doctor",icon:FaUserDoctor },
    { title: "Nurse", module: "nurse" ,icon:RiNurseFill},
    { title: "Pharmacist", module: "pharmacist",icon:IoPersonSharp },
    { title: "Receptionist", module: "receptionist",icon:AiFillMedicineBox }
  ],
  DOCTOR: [
    { title: "Appointments", module: "appointment",icon:SiGooglesheets },
    { title: "Medical Record", module: "medicalRecord" ,icon:RiNurseFill}
  ],
  NURSE: [
    { title: "Appointments", module: "appointment",icon:SiGooglesheets },
    { title: "Medical Record", module: "medicalRecord" ,icon:RiNurseFill}
  ]
};
export const menuRolesbar: Record<string, MenuItem<RoleModuleType>[]> = {
  SUPERADMIN: [
    { title: "Roles", module: "role" ,icon:PiUsersThreeBold}
  ]
};


export type RoleModuleType = "role";

export type AppModuleType = AdminModuleType | RoleModuleType|MastersModuleType|BillingModuleType;

export type MenuItem<T> = {
  title: string;
  module: T;
  icon?: IconType;
};


export const menuMastersbar: Record<string, MenuItem<MastersModuleType>[]> = {
  SUPERADMIN: [
    { title: "Users", module: "users",icon: FaUsers },
    { title: "Tests", module: "test",icon: GiTestTubes },
    {title:"Medicines",module:"medicines",icon: AiFillMedicineBox},
    {title:"Appointments",module:"appointments",icon:SiGooglesheets},
    { title: "Medical Record", module: "medicalRecord" ,icon:RiNurseFill}
  ],
   TENANT: [
    { title: "Users", module: "users",icon: FaUsers },
    { title: "Tests", module: "test",icon: GiTestTubes },
    {title:"Medicines",module:"medicines",icon: AiFillMedicineBox},
    {title:"Appointments",module:"appointments",icon:SiGooglesheets},
    { title: "Medical Record", module: "medicalRecord" ,icon:RiNurseFill}
  ],
    HOSPITAL: [
    { title: "Users", module: "users",icon: FaUsers },
    { title: "Tests", module: "test",icon: GiTestTubes },
    {title:"Medicines",module:"medicines",icon: AiFillMedicineBox},
    {title:"Appointments",module:"appointments",icon:SiGooglesheets},
    { title: "Medical Record", module: "medicalRecord" ,icon:RiNurseFill}
  ],
};

export const menuProfilebar: Record<string, MenuItem<MastersModuleType>[]> = {
  SUPERADMIN: [
    { title: "Users", module: "users",icon: FaUsers },
    { title: "Tests", module: "test",icon: GiTestTubes },
    {title:"Medicines",module:"medicines",icon: AiFillMedicineBox},
    {title:"Appointments",module:"appointments",icon:SiGooglesheets}
  ],
   TENANT: [
    { title: "Users", module: "users",icon: FaUsers },
    { title: "Tests", module: "test",icon: GiTestTubes },
    {title:"Medicines",module:"medicines",icon: AiFillMedicineBox},
    {title:"Appointments",module:"appointments",icon:SiGooglesheets
    }
  ],
    HOSPITAL: [
    { title: "Users", module: "users",icon: FaUsers },
    { title: "Tests", module: "test",icon: GiTestTubes },
    {title:"Medicines",module:"medicines",icon: AiFillMedicineBox},
    {title:"Appointments",module:"appointments",icon:SiGooglesheets
    }
  ],
};

export const menuBillingbar: Record<string, MenuItem<BillingModuleType>[]> = {
  SUPERADMIN: [
    { title: "Bills", module: "bill",icon: FaUsers },
    { title: "Reports", module: "report",icon: GiTestTubes },
  ],
   TENANT: [
    { title: "Bills", module: "bill",icon: FaUsers },
    { title: "Reports", module: "report",icon: GiTestTubes },
  ],
    HOSPITAL: [
    { title: "Bills", module: "bill",icon: FaUsers },
    { title: "Reports", module: "report",icon: GiTestTubes },
  ],
};