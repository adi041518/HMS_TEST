import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RoleItem {
  roleCode: string;
  roleName: string;
}

interface RoleState {
  roles: RoleItem[];
}

const initialState: RoleState = {
  roles: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<RoleItem[]>) => {
      state.roles = action.payload;
    },
    clearRoles: (state) => {
      state.roles = [];
    },
  },
});

export const { setRoles, clearRoles } = roleSlice.actions;
export default roleSlice.reducer;