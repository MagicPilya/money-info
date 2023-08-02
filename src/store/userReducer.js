import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer({}, (builder) => {
  builder
    .addCase("SET_CURRENT_USER", (state, action) => {
      state.user =  action.payload;
    })
    .addCase("SET_ACTIVE_CURRENCY", (state, action) => {
      state.user.userInfo.savedData.currentCurrency = action.payload;
    })
})

export default userReducer;