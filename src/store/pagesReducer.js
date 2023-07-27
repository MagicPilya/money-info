import { createReducer } from "@reduxjs/toolkit";

const pagesReducer = createReducer(
  { loginPage: { visibility: true }, registrationPage: { visibility: false }, mainPage: {visibility: false} },
  (builder) => {
    builder.addCase("CHANGE_VISIBILITY_OF_PAGE", (state, action) => {
      for (let page in state) {
        state[page].visibility = false;
        if (state.hasOwnProperty(page)) {
          if (action.payload.page === page) {
            if (action.payload.page === 'loginPage') {
              state.loginPage.visibility = action.payload.visibility;
            } else if (action.payload.page === 'registrationPage') {
              state.registrationPage.visibility = action.payload.visibility;
            } else if (action.payload.page === 'mainPage') {
              state.mainPage.visibility = action.payload.visibility;
            }
          }
        }
      }

    });
  }
);

export default pagesReducer;
