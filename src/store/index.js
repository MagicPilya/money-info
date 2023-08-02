import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    currentUser: userReducer,
  },
});

export default store;
