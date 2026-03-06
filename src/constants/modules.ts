import type { Module, Access } from "../types/role";

export const MODULES: Module[] = [
  "tenant",
  "hospital",
  "doctor",
  "nurse",
  "receptionist",
  "pharmacist",
  "patient",
  "testReport",
  "guardian",
  "appointment",
  "billing",
  "consent",
  "medicalRecord",
  "medicine",
  "prescription",
  "role",
  "newTenant",
];

export const ACCESS: Access[] = [
  "create",
  "view",
  "update",
  "delete"
];
