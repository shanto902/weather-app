import { createSlice } from "@reduxjs/toolkit";
import vendors from "../../config/vendors";

const initialState = {
  currentVendor: vendors.vendor1,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    changeVendor: (state, action) => {
      const vendorKey = action.payload;
      if (vendors[vendorKey]) {
        state.currentVendor = vendors[vendorKey];
      } else {
        console.error(`Vendor with key "${vendorKey}" not found.`);
      }
    },
  },
});

export const { changeVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
