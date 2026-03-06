import admin from "../assets/admin.png"
import billing from "../assets/billing.png"
import roles from "../assets/roles.png"
import masters from "../assets/masters.png"
import profile from "../assets/myProfile.png"
export const dashboardCards = {
  SUPERADMIN: [
    { title: "ADMIN", path: "/dashboard/admin", description: "Manages all The admin from here", image: admin },
    { title: "BILLING", path: "/dashboard/billing", description: "Manages all Your billing From here", image: billing },
    { title: "ROLES", path: "/dashboard/roles", description: "Manages all Ur roles here", image: roles },
    { title: "MASTERS", path: "/dashboard/masters", description: "Manages all ur users from here ", image: masters }

  ],
  TENANT: [
    { title: "ADMIN", path: "/dashboard/admin", description: "Manages All the Users From here", image: admin },
    { title: "BILLLING", path: "/dashboard/billing", description: "Manages all Your billing From here", image: billing },
    { title: "MASTERS", path: "/dashboard/masters", description: "Manages all ur users from here ", image: masters }

  ],
  HOSPITAL: [
    { title: "ADMIN", path: "/dashboard/admin", description: "Manages All the Users From here", image: admin },
    { title: "BILLLING", path: "/dashboard/billing", description: "Manages all Your billing From here", image: billing },
    { title: "MASTERS", path: "/dashboard/masters", description: "Manages all ur users from here ", image: masters }
  ],
  DOCTOR: [
    { title: "ADMIN", path: "/dashboard/admin", description: "Manages All the Users From here", image: admin },
    { title: "PROFILE", path: "/dashboard/masters", description: "Manages all ur users from here ", image: profile }
  ],
  NURSE: [
    { title: "ADMIN", path: "/dashboard/admin", description: "Manages All the Users From here", image: admin },
    { title: "PROFILE", path: "/dashboard/masters", description: "Manages all ur users from here ", image: profile }
  ],
  PHARMACIST: [
    { title: "ADMIN", path: "/dashboard/admin", description: "Manages All the Users From here", image: admin },
    { title: "PROFILE", path: "/dashboard/masters", description: "Manages all ur users from here ", image: profile }
  ]
  
};
