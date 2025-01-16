
import { createSlice } from "@reduxjs/toolkit";

interface T {
    catName:string,
    catBudget : number,
    unit : string,
    myUUID : string,
    currentMonth : number,
    currentDate: string,
  }

  interface Exp {
    expenseName : string,
    category :string,
    expenseDesc : string,
    expenseAmount :number,
    unit :string,
    catId :string;
    currentDate:string;
  currentMonth : number,
  }

const editDataSlice = createSlice({
  name: "editData",

  // Initial State

  initialState: {
     myUUID: "",
  },

  reducers: {
    
    deleteCategory(state,action){
        const categoryId = action.payload;
        const existingCategories = JSON.parse(localStorage.getItem("categories") as string) || [];
        const updatedCategory = existingCategories.filter((item:T) => item.myUUID !== categoryId);
        localStorage.setItem("categories", JSON.stringify(updatedCategory));
        return;
    },
    showCatData(state,action){
       const data = action.payload;
       state.myUUID = data;
       document.getElementById('categoryPopup')!.classList.remove('hidden');

    },
    editCategory(state,action){
      const data = action.payload;
      // alert(state.myUUID);
      const existingCategories = JSON.parse(localStorage.getItem("categories") as string) || [];
      const updatedCategory = existingCategories.map((item:T) =>
        item.myUUID === state.myUUID
          ? { ...item, catName: data.catName , catBudget : data.catBudget, unit : data.unit }
          : item
      );
      localStorage.setItem("categories", JSON.stringify(updatedCategory));
        return;
    },
    editExpense(state,action){
      const data = action.payload;
      const existingExpense = JSON.parse(localStorage.getItem("expense") as string) || [];
      const updatedExpense = existingExpense.map((item:Exp) =>
        item.expenseName === data.id
          ? { ...item, expenseName: data.expenseName , expenseAmount : data.expenseAmount, unit : data.unit, expenseDesc : data.expenseName,category : data.category }
          : item
      );
      localStorage.setItem("expense", JSON.stringify(updatedExpense));
        return;
    },
    deleteExpense(state,action){
      const expenseName = action.payload;
      const existingCategories = JSON.parse(localStorage.getItem("expense") as string) || [];
      const updatedExpense = existingCategories.filter((item:Exp) => item.expenseName !== expenseName);
      localStorage.setItem("expense", JSON.stringify(updatedExpense));
      return;
  },
   
  },
});

export const editDataActions = editDataSlice.actions;
export default editDataSlice;
