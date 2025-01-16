import { createSlice } from "@reduxjs/toolkit";

// interface search {
//     text : string,
// }

// const searchState : search = {
//     text : "",
// }

const addSearchSlice = createSlice({
  name: "search",

  // Initial State
  
  initialState : {
    searchText : "",
  },

  reducers: {
     doSearch (state,action){
        state.searchText = action.payload;
     }
  },
});

export const addSearchActions = addSearchSlice.actions;
export default addSearchSlice;
