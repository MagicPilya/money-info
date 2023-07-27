import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import pagesReducer from "./pagesReducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    pages: pagesReducer
  }
});

export default store;
