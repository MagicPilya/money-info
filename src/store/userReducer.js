import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer({}, (builder) => {
  builder
    .addCase("SET_CURRENT_USER", (state, action) => {
      state.user =  action.payload;
    })
    .addCase("SET_ACTIVE_CURRENCY", (state, action) => {
      state.user.userInfo.currentCurrency = action.payload;
    })
    .addCase("SET_ACTIVE_ACCOUNT", (state, action) => {
      state.user.userInfo.currentAccount = action.payload;
    })
})

export default userReducer;