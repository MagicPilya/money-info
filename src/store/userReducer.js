import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer({}, (builder) => {
  builder
    .addCase("SET_CURRENT_USER", (state, action) => {
      state.user = action.payload;
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
      state.user.currencies.push(action.payload);
    })
    .addCase("ADD_ACCOUNT", (state, action) => {
      const account = action.payload;
      state.user.accounts.push(account);
    })
    .addCase("DELETE_CURRENCY", (state, action) => {
      const currency = action.payload;
      state.user.currency.currencies.map((item, key) => {
        if (currency === item) {
          state.user.currency.currencies.splice(key, 1);
        }
        return null;
      });
    })
    .addCase("RENAME_ACCOUNT", (state, action) => {
      const index = action.payload.index;
      const name = action.payload.name;
      state.user.accounts[index].name = name;
    })
    .addCase("DELETE_ACCOUNT", (state, action) => {
      const index = action.payload;
      state.user.accounts.splice(index, 1);
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
        return undefined;
      });
    })
    .addCase("ADD_OPERATION", (state, action) => {
      state.user.operations.push(action.payload);
    })
    .addCase("EDIT_OPERATION", (state, action) => {
      const symbol = action.payload.finalObject.operationType;
      const newAmount = action.payload.finalObject.amount;

      const operationIndex = state.user.operations.findIndex(
        (item, index) => index === action.payload.operationID
      );

      if (operationIndex !== -1) {
        const oldAmount = state.user.operations[operationIndex].amount;

        state.user.operations[operationIndex] = action.payload.finalObject;

        const difference =
          symbol === "plus" ? newAmount - oldAmount : oldAmount - newAmount;

        state.user.accounts.forEach((item, index) => {
          if (item.name === action.payload.finalObject.currentAccount) {
            state.user.accounts[index].totalMoney += difference;
          }
        });
      }
    })
    .addCase("CORRECT_ACCOUNT_BALANCE", (state, action) => {
      const newBalance = action.payload.newBalance;
      const index = action.payload.index;
      state.user.accounts[index].totalMoney = newBalance;
    })
    .addCase("ADD_RETRIEVINGS_CATEGORY", (state, action) => {
      state.user.categories.retrievings.push(action.payload);
    })
    .addCase("ADD_COSTS_CATEGORY", (state, action) => {
      state.user.categories.costs.push(action.payload);
    })
    .addCase("ADD_CREDITOR", (state, action) => {
      state.user.creditors.push(action.payload);
    });
});

export default userReducer;
