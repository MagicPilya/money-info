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
      const name = action.payload.name;
      const index = action.payload.index;
      state.user.userInfo.currentAccount = name;
      state.user.userInfo.currentAccountIndex = index;
    })
    .addCase("ADD_CURRENCY", (state, action) => {
      state.user.currency.currencies.push(action.payload);
    })
    .addCase("ADD_ACCOUNT", (state, action) => {
      const account = action.payload;
      state.user.accounts.push(account);
    })
    .addCase("DELETE_CURRENCY", (state, action) => {
      const currency = action.payload;
      state.user.currency.currencies.map( (item, key) => {
        if (currency === item) {
          state.user.currency.currencies.splice(key, 1);
        }
        return null;
      })
    })
    .addCase("RENAME_ACCOUNT", (state, action) => {
      const index = action.payload.index;
      const name = action.payload.name;
      state.user.accounts[index].name = name;
    })
    .addCase("DELETE_ACCOUNT", (state, action) => {
      const index = action.payload;
      state.user.accounts.splice(index, 1)
    })
    .addCase("CORRECT_ACCOUNT_BALANCE", (state, action) => {
      const newBalance = action.payload.newBalance;
      const index = action.payload.index;
      state.user.accounts[index].totalMoney = newBalance;
    })
    .addCase("SET_ACTIVE_CURRENCY_INDEX", (state, action) => {
      state.user.userInfo.currentCurrencyIndex = action.payload;
    })
    .addCase("INCREASE_ACCOUNT_MONEY", (state, action) => {
      const currentAccount = state.user.userInfo.currentAccountIndex;
      state.user.accounts[currentAccount].totalMoney += +action.payload;
    })
    .addCase("DECREASE_ACCOUNT_MONEY", (state, action) => {
      const currentAccount = state.user.userInfo.currentAccountIndex;
      state.user.accounts[currentAccount].totalMoney -= action.payload;
    })
    .addCase("TRANSFER_MONEY", (state, action) => {
      const from = action.payload.from;
      const to = action.payload.to;
      const amount = action.payload.amount;
      state.user.accounts.map((item, index) => {
        if (item.name === from) {
          state.user.accounts[index].totalMoney -= +amount;
        } else if (item.name === to) {
          state.user.accounts[index].totalMoney += +amount;
        }
        return undefined
      })
    })
    .addCase("ADD_OPERATION", (state, action) => {
      state.user.operations.push(action.payload);
    })
})

export default userReducer;