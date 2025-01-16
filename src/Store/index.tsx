import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuth-slice";
import addCategorySlice from "./category-slice";
import addExpenseSlice from "./expenseSlice";
import addSearchSlice from "./searchSlice";
import editDataSlice from "./editDataSlice";

// creating store

const store = configureStore({
    reducer : {userAuth : userAuthSlice.reducer, addCategory : addCategorySlice.reducer, addExpense : addExpenseSlice.reducer, search : addSearchSlice.reducer, editData : editDataSlice.reducer }
});
export default store;

export type RootState = ReturnType<typeof store.getState>

// export type IRootState = ReturnType<typeof store.getState>;