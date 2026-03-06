// Allowed Actions
export type Access = "create" | "view" | "update" | "delete";

// Allowed Modules
export type Module =
  | "tenant"
  | "hospital"
  | "doctor"
  | "nurse"
  | "receptionist"
  | "pharmacist"
  | "patient"
  | "testReport"
  | "guardian"
  | "appointment"
  | "billing"
  | "consent"
  | "medicalRecord"
  | "medicine"
  | "prescription"
  | "role"
  | "newTenant";


// Privilege Model
export type Privilege = {
  module: Module;
  access: Access[];
};
