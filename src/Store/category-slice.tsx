import { createSlice } from "@reduxjs/toolkit";

const addCategorySlice = createSlice({
  name: "addCategory",

  // Initial State

  initialState: {
     catId: 0,
  },

  reducers: {
    
    addCategory(state,action){
        const categoryData = action.payload;
        const existingCategories = JSON.parse(localStorage.getItem("categories") as string) || [];
        existingCategories.push(categoryData);
        localStorage.setItem("categories", JSON.stringify(existingCategories));
        alert("added successfully");
        return;
    }
  
  },
});

export const addCatActions = addCategorySlice.actions;
export default addCategorySlice;