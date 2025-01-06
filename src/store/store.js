import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weatherSlice";
import vendorReducer from "./features/vendorSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    vendor: vendorReducer,
  },
});

export default store;
