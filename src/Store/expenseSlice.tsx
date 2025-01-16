import { createSlice } from "@reduxjs/toolkit";

const addExpenseSlice = createSlice({
  name: "addExpense",

  // Initial State

  initialState: {
     expense : 0,
  },

  reducers: {
     
    addExpense(state,action) {
        const expense = action.payload ;
        const existingExpense = JSON.parse(localStorage.getItem("expense") as string) || [];
        existingExpense.push(expense);
        localStorage.setItem("expense", JSON.stringify(existingExpense));
        
        alert("added successfully");
        document.getElementById('categoryPopup')!.classList.add('hidden');
        return;
    }

  },
});

export const addExpActions = addExpenseSlice.actions;
export default addExpenseSlice;
